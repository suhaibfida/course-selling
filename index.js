const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;
const dbConnect = process.env.DB_URI;
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { AdminModel } = require("./db");
const { UserModel } = require("./db");
const { CourseModel } = require("./db");
const { PurchasesModel } = require("./db");

app.use(express.static(__dirname + "/public"));
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function connectdb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(port);
  } catch {
    console.log("Database Connection Error!");
  }
}
connectdb();
