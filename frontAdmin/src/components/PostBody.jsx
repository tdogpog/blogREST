import PropTypes from "prop-types";

export default function PostBody({ post }) {
  return (
    <ul className="postBodyContainer">
      <h2>{post.title}</h2>
      <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="postBody">{post.content}</div>
    </ul>
  );
}
PostBody.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired, // The post ID is required and must be a string
    title: PropTypes.string.isRequired, // The post title is required and must be a string
    content: PropTypes.string.isRequired, // The post content is required and must be a string
    createdAt: PropTypes.string.isRequired, // The createdAt field is required and must be a string
  }).isRequired, // The entire `post` object is required
};
