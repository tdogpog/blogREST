const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllPosts(req, res) {
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

async function getPost(req, res) {
  try {
    const postID = req.params.postID;
    const post = await prisma.post.findUnique({
      where: { id: postID },
    });
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}
async function getComments(req, res) {
  try {
    const postID = req.params.postID;
    const comments = await prisma.comment.findMany({
      where: { postID: postID },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching comments:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}
async function createComment(req, res) {
  try {
    const postID = req.params.postID;
    await prisma.comment.create({
      data: {
        name: req.body.nameInput,
        content: req.body.mainMsg,
        postID: postID,
      },
    });
  } catch (error) {
    console.error("Error posting comment:", error.message); // Log the error
    res.status(500).json({ error: "Internal server error" }); // Handle server error
  }
}

modules.export = { getAllPosts, getPost, getComments, createComment };
