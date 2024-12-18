const { Router } = require("express");
const { jwtVerify } = require("../app");
const postRouter = Router();

//gets
postRouter.get("/", getAllPosts);

postRouter.get("/:postID", getPost);

postRouter.get("/:postID/comments", getComments);

//posts
postRouter.post("/", jwtVerify, createPost);

postRouter.post("/:postID/comments", createComment);

//puts
postRouter.put("/:postID", jwtVerify, updatePost);

//deletes
postRouter.delete("/:postID", jwtVerify, deletePost);
postRouter.delete("/:postID/comments/:commentID", jwtVerify, deleteComment);

module.exports = postRouter;
