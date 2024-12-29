import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Posts({ posts }) {
  return (
    <ul className="postContainer">
      {posts.map((post) => (
        <li key={post.id} className="post">
          <Link to={`/dashboard/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // uuid string
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired, // ISO date string
    })
  ).isRequired,
};
