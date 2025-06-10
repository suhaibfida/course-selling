const { Router } = require("express");
const courseRouter = Router();
const { PurchasesModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  // check user paid or not
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
  const userId = req.userId;
  const show = await PurchasesModel.find({
    userId,
  });
  const showc = await CourseModel.find({
    _id: { $in: show.map((x) => x.userId) },
  });

  res.json({
    show,
    showc,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
