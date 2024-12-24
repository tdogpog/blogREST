import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Posts({ posts }) {
  return (
    <ul className="posContainer">
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
      content: PropTypes.string.isRequired,
      adminID: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired, // ISO date string
      published: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired, // comment ID
          content: PropTypes.string.isRequired, // comment content
          createdAt: PropTypes.string.isRequired, // ISO date string
          postID: PropTypes.string.isRequired, // the post to which the comment belongs
        })
      ),
      admin: PropTypes.shape({
        id: PropTypes.string.isRequired, // admin ID (uuid)
        username: PropTypes.string.isRequired, // admin username
      }).isRequired,
    })
  ).isRequired,
};
