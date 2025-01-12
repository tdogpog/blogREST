import { useState, useEffect } from "react";
import { authRequest } from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PostBody from "../components/PostBody";
import Comments from "../components/Comments";
export default function Post({ backend }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { postID } = useParams();
  const url = `${backend}admin/posts/${postID}`;
  const urlComments = `${backend}admin/posts/${postID}/comments`;
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
    <div className="container">
      <div className="content">
        <Link to={`/dashboard/${postID}/edit`} state={{ post }}>
          Edit or Change Publish Status
        </Link>
        <button onClick={handleDelete}>Delete Post</button>
        <PostBody post={post} />
      </div>
      <div className="contentComments">
        <h2>Comments</h2>
        <Comments
          comments={comments}
          backend={backend}
          setComments={setComments}
        />
      </div>
    </div>
  );
}

Post.propTypes = {
  backend: PropTypes.string.isRequired, // Validate that 'backend' is a required string
};
