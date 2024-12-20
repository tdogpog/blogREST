const { Router } = require("express");
const { jwtVerify } = require("../app");
const postRouter = Router();

//gets
postRouter.get("/", getAllPosts); //all user viewable posts

postRouter.get("/:postID", getPost); //specific post

postRouter.get("/:postID/comments", getComments); // comments under specific post

//posts
postRouter.post("/:postID/comments", createComment); //make a comment

module.exports = postRouter;
