const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPostsAdmin(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { published: true },
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
  } catch (error) {}
}
async function updatePost(req, res) {
  try {
  } catch (error) {}
}
async function deletePost(req, res) {
  try {
  } catch (error) {}
}
async function deleteComment(req, res) {
  try {
  } catch (error) {}
}

modules.export = {
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
  deleteComment,
};
