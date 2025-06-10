const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const id = Schema.ObjectId;

const Users = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const addCourse = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: id,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const Purchases = new Schema({
  courseId: String,
  userId: String,
});
const UserModel = mongoose.model("users", Users);
const CourseModel = mongoose.model("courses", addCourse);
const AdminModel = mongoose.model("admin", Admin);
const PurchasesModel = mongoose.model("purchase", Purchases);

module.exports = {
  UserModel: UserModel,
  CourseModel: CourseModel,
  AdminModel: AdminModel,
  PurchasesModel: PurchasesModel,
};
