const { Router } = require("express");
const adminRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { AdminModel } = require("../db");
const { CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");
const JSecret = process.env.RAsecret;

// ----------------------------------------------------------------------------------------------
adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const admin = z.object({
    email: z
      .string()
      .min(7)
      .max(25)
      .refine((val) => {
        return /[a-zA-Z0-9@]/.test(val);
      }),
    password: z
      .string()
      .min(7)
      .max(15)
      .refine((val) => {
        return /[a-zA-Z0-9@]/.test(val);
      }),
  });
  const parse = admin.safeParse(req.body);
  if (!parse.success) {
    console.log("Zod validation failed:", parse.error.format());
    return res.status(400).json({
      message: "Incorrect format",
      errors: parse.error.format(),
    });
  }
  const hashP = await bcrypt.hash(password, 5);

  await AdminModel.create({
    email: email,
    password: hashP,
    firstName: firstName,
    lastName: lastName,
  });
  console.log("sc");
  console.log("account created");
});
adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await AdminModel.findOne({
    email: email,
  });
  if (!response) {
    return res.json({
      message: "email was not found",
    });
  }
  console.log("hello2");
  const decrypt = await bcrypt.compare(password, response.password);

  if (!decrypt) {
    res.json({
      message: "password or email did not match! ",
    });
  } else {
    const token = jwt.sign({ id: response._id }, JSecret);
    res.json({
      token: token,
    });
  }
  console.log("hello from here");
});
adminRouter.post("/createcourse", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageURL } = req.body;
  const course = await CourseModel.create({
    title,
    description,
    price,
    imageURL,
    adminId,
  });

  res.json({
    message: "Added course",
    courseId: course._id,
  });
});
adminRouter.put("/edit", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageURL, courseId } = req.body;

  await CourseModel.updateOne(
    {
      adminId: adminId,
      _id: courseId,
    },
    {
      title,
      description,
      price,
      imageURL,
    }
  );

  res.json({
    message: "COURSE EDITED SUCCESSFULLY",
  });
});
module.exports = {
  adminRouter: adminRouter,
};
