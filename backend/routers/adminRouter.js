const { Router } = require("express");

const adminRouter = Router();

//gets
adminRouter.get("/", getAllPostsAdmin); //all posts regardless of published boolean

//posts
adminRouter.post("/", jwtVerify, createPost); // creating a new post

//puts
adminRouter.put("/:postID", jwtVerify, updatePost);

//deletes
adminRouter.delete("/:postID", jwtVerify, deletePost);
adminRouter.delete("/:postID/comments/:commentID", jwtVerify, deleteComment);
