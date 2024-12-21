const { Router } = require("express");
const { jwtVerify } = require("../app");
const {
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  deleteComment,
} = require("../controllers/adminController");
const {
  getPost,
  getComments,
  createComment,
} = require("../controllers/postController");

const adminRouter = Router();

//gets
adminRouter.get("/", jwtVerify, getAllPostsAdmin); //all posts regardless of published boolean
//gets using postController funcs
adminRouter.get("/:postID", getPost); //specific post
adminRouter.get("/:postID/comments", getComments); // comments under specific post

//posts
adminRouter.post("/", jwtVerify, createPost); // creating a new post
//posts using postController
adminRouter.post("/:postID/comments", createComment); //make a comment

//puts
adminRouter.put("/:postID", jwtVerify, updatePost);

//deletes
adminRouter.delete("/:postID", jwtVerify, deletePost);
adminRouter.delete("/:postID/comments/:commentID", jwtVerify, deleteComment);

module.exports = adminRouter;
