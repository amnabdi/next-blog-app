const mongoose = require("mongoose");
require("dotenv").config();

const users = require("./data/db.users.json");
const posts = require("./data/db.posts.json");
const categories = require("./data/db.category.json");
const comments = require("./data/db.comments.json");

const { UserModel } = require("./app/models/user");
const { PostModel } = require("./app/models/post");
const { CommentModel } = require("./app/models/comment");
const { CategoryModel } = require("./app/models/category");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongo connected");

  // پاک کردن قبلی‌ها
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});
  await CommentModel.deleteMany({});
  await CategoryModel.deleteMany({});

  // حالا insert
  await UserModel.insertMany(users);
  await PostModel.insertMany(posts);
  await CommentModel.insertMany(comments);
  await CategoryModel.insertMany(categories);

  console.log("DATA INSERTED SUCCESSFULLY.");
  process.exit(0);
})().catch((err) => {
  console.log("DATA INSERTION FAILED: ", err);
  process.exit(1);
});
