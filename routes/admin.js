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
    return res.json({
      message: "Incorrect format",
    });
  }

  const hashP = await bcrypt.hash(password, 5);

  await AdminModel.create({
    email: email,
    password: hashP,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "Account created successfully",
  });
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
adminRouter.post("/showc", async (req, res) => {
  const adminId = req.adminId;
  const show = await CourseModel.find();
  console.log(show);
  res.json({
    message: "All courses are on screen",
  });
});
module.exports = {
  adminRouter: adminRouter,
};
