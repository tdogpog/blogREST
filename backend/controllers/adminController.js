const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPostsAdmin(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true, // Select only the necessary fields
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
}
async function createPost(req, res) {
  try {
    const { title, content, adminID } = req.body;
    await prisma.post.create({
      data: {
        title,
        content,
        adminID,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "An error occurred while creating post" });
  }
}
async function updatePost(req, res) {
  try {
    const postID = req.params.postID;

    await prisma.post.update({
      where: { id: postID },
      data: req.body,
    });
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ error: "An error occurred while updating post" });
  }
}
async function deletePost(req, res) {
  try {
    await prisma.post.delete({});
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "An error occurred while deleting post" });
  }
}
async function deleteComment(req, res) {
  try {
    await prisma.comment.delete({});
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res.status(500).json({ error: "An error occurred while deleting comment" });
  }
}

modules.export = {
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  deleteComment,
};
