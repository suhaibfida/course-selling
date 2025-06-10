const express = require("express");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Jsecret = process.env.RUsecret;
const bcrypt = require("bcrypt");
const { UserModel, PurchasesModel } = require("../db");
const { z } = require("zod");
const userRouter = Router();

userRouter.use(express.json());
userRouter.post("/signup", async (req, res) => {
  const User = z.object({
    email: z
      .string()
      .min(7)
      .max(25)
      .refine(
        (val) => {
          return /[a-zA-Z0-9]/.test(val);
        },
        {
          message: "Password must include @, number, capital letters",
        }
      ),
    password: z
      .string()
      .min(7)
      .max(25)
      .refine(
        (val) => {
          return /[a-zA-Z0-9@]/.test(val);
        },
        {
          message: "Password must include @, number, capital letters",
        }
      ),
    firstName: z.string().min(3).max(9),
    lastName: z.string().min(3).max(8),
  });
  const safeparse = User.safeParse(req.body);
  if (!safeparse.success) {
    return res.json({
      message: "Incorect format",
    });
  }
  const { email, password, firstName, lastName } = req.body;

  const hashpasswd = await bcrypt.hash(password, 5);
  try {
    await UserModel.create({
      email: email,
      password: hashpasswd,
      firstName: firstName,
      lastName: lastName,
    });

    res.json({
      message: "signup endpoint.",
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: "SgnUp failed",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await UserModel.findOne({
    email: email,
  });
  if (!response) {
    return res.json({
      message: "user not found",
    });
  }
  const hash = await bcrypt.compare(password, response.password);
  if (hash) {
    const token = jwt.sign({ id: response._id, Jsecret }, jwtSecret);
    res.json({
      token: token,
    });
  } else {
    res.json({ mesage: "password did not match" });
  }
});
userRouter.get("/showpurchases", async (req, res) => {
  const userId = req.userId;

  const purchases = await PurchasesModel.find({
    userId,
  });

  res.json({
    purchases,
  });
});
module.exports = {
  userRouter: userRouter,
};
