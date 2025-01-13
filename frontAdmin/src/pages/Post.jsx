import { useState, useEffect } from "react";
import { authRequest } from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const { postID } = useParams();

  const url = `${backend}admin/posts/${postID}`;
  const urlComments = `${backend}admin/posts/${postID}/comments`;
  const urlCommentPost = `${backend}admin/${postID}/comments`;
  const urlDelete = `${backend}admin/${postID}`;

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

  const handleDelete = async (e) => {
    e.preventDefault();
    const isConfirmed = confirm("Confirm post deletion?");
    if (isConfirmed) {
      try {
        await authRequest(urlDelete, "DELETE");

        alert("Post Deleted");
        navigate(`/dashboard`);
      } catch (error) {
        console.log(error.message);
        alert("Error occured while deleting, check console for logs");
      }
    }
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
        <div className="post-header-buttons">
          <Link to={`/dashboard/${postID}/edit`} state={{ post }}>
            <button className="editDeleteButton">
              Edit or Change Publish Status
            </button>
          </Link>
          <button className="editDeleteButton" onClick={handleDelete}>
            Delete Post
          </button>
        </div>
        <PostBody post={post} />
      </div>
      <div className="contentComments">
        <h2>Comments</h2>
        <NewCommentForm
          handleCommentSubmit={handleCommentSubmit}
          handleCommentChange={handleCommentChange}
          commentData={commentData}
        />
        <h3 className="commentsTitle">Comments</h3>
        <hr></hr>
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
