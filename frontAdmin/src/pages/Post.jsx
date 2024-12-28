import { useState, useEffect, useParams } from "react";
import { authRequest } from "../api";
import PropTypes from "prop-types";
import PostBody from "../components/PostBody";
import Comments from "../components/Comments";
export default function Post({ backend }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const { postID } = useParams();
  const url = `${backend}admin/posts/${postID}`;
  const urlComments = `${backend}admin/posts/${postID}/comments`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await authRequest(url);
        const dataComments = await authRequest(urlComments);
        if (!data.ok || !dataComments.ok) {
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

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="container">
      <div className="content">
        <PostBody post={post} />
      </div>
      <div className="contentComments">
        <h2>Comments</h2>
        <Comments comments={comments} />
      </div>
    </div>
  );
}

Post.propTypes = {
  backend: PropTypes.string.isRequired, // Validate that 'backend' is a required string
};
