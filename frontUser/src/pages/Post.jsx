import { useState, useEffect } from "react";
import { authRequest } from "../api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PostBody from "../components/PostBody";
import Comments from "../components/Comments";
import NewCommentForm from "../components/NewCommentForm";
export default function Post({ backend }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentData, setCommentData] = useState({
    commentName: "",
    commentContent: "",
  });

  const { postID } = useParams();

  const url = `${backend}posts/${postID}`;
  const urlComments = `${backend}posts/${postID}/comments`;
  const urlCommentPost = `${backend}posts/${postID}/comments`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await authRequest(url);
        const dataComments = await authRequest(urlComments);
        if (!data || !dataComments) {
          throw new Error("Failed to fetch specific post");
        }

        setPost(data);
        setComments(dataComments);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    };
    fetchPost();
  }, [url, urlComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = await authRequest(urlCommentPost, "POST", commentData);
      //spread and insert syntax
      setComments((prevComments) => [...prevComments, newComment]);
      //clear field
      setCommentData({ commentName: "", commentContent: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCommentChange = async (e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  if (!post) {
    return <div>Loading post data...</div>;
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <PostBody post={post} />
      </div>
      <div className="contentComments">
        <h2>Create a comment:</h2>
        <NewCommentForm
          handleCommentSubmit={handleCommentSubmit}
          handleCommentChange={handleCommentChange}
          commentData={commentData}
        />
        <Comments
          comments={comments}
          backend={backend}
          setComments={setComments}
          postID={postID}
        />
      </div>
    </div>
  );
}

Post.propTypes = {
  backend: PropTypes.string.isRequired, // Validate that 'backend' is a required string
};
