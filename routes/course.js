const { Router } = require("express");
const courseRouter = Router();
const { PurchasesModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const courseId = req.body.courseId;
  const userId = req.userId;

  await PurchasesModel.create({
    courseId,
    userId,
  });
  res.json({
    message: "bought successfully",
  });
});
courseRouter.get("/courses", async (req, res) => {
  const courses = await CourseModel.find({});
  res.json(courses);
});

module.exports = {
  courseRouter: courseRouter,
};
