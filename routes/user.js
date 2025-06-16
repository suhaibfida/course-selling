const express = require("express");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Jsecret = process.env.RUsecret;
const bcrypt = require("bcrypt");
const { UserModel, PurchasesModel } = require("../db");
const { z } = require("zod");
const userRouter = Router();
const { userMiddleware } = require("../middlewares/user");

userRouter.use(express.json());
userRouter.post("/signup", async (req, res) => {
  const User = z.object({
    email: z.string().email().min(7).max(50),
    password: z
      .string()
      .min(7)
      .max(25)
      .refine(
        (val) => /[A-Z]/.test(val) && /[0-9]/.test(val) && /[@]/.test(val),
        {
          message: "Password must include a capital letter, a number, and '@'",
        }
      ),
    firstName: z.string().min(3).max(9),
    lastName: z.string().min(3).max(8),
  });

  const safeparse = User.safeParse(req.body);
  if (!safeparse.success) {
    console.log("Zod validation failed:", safeparse.error.format());
    return res.status(400).json({
      message: "Incorrect format",
      errors: safeparse.error.format(),
    });
  }

  const { email, password, firstName, lastName } = req.body;

  const hashpasswd = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      email,
      password: hashpasswd,
      firstName,
      lastName,
    });

    res.json({ message: "Signup successful." });
  } catch (err) {
    console.error("MongoDB error:", err);
    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
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
    const token = jwt.sign({ id: response._id, Jsecret }, Jsecret);
    res.json({
      token: token,
    });
  } else {
    res.json({ mesage: "password did not match" });
    conole.log("password incorrect");
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
