import PropTypes from "prop-types";
import { authRequest } from "../api";
export default function Comments({ comments, postID, backend, setComments }) {
  // id grabbed per comment so url in the handler
  const handleDelete = async (commentID) => {
    const url = `${backend}admin/${postID}/comments/${commentID}`;
    try {
      await authRequest(url, "DELETE");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentID)
      );
    } catch (error) {
      console.log("error deleting comment", error.message);
    }
  };

  //helper func to convert the time
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <ul className="commentBodyContainer">
      {comments.map((comment) => (
        <li key={comment.id} className="commentItem">
          <strong>{comment.name || "Visitor"}</strong>
          <p>{timeAgo(comment.createdAt)}</p>
          <p>{comment.content}</p>
          <button
            onClick={() => handleDelete(comment.id)}
            className="deleteButton"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      content: PropTypes.string.isRequired,
      postID: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  postID: PropTypes.string.isRequired,
  backend: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};
