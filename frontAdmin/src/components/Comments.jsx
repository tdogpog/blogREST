import PropTypes from "prop-types";
import { authRequest } from "../api";
export default function Comments({ comments, backend, setComments }) {
  // id grabbed per comment so url in the handler
  const handleDelete = async (commentID) => {
    const url = `${backend}admin/comments/${commentID}`;
    try {
      await authRequest(url, "DELETE");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentID)
      );
    } catch (error) {
      console.log("error deleting comment", error.message);
    }
  };
  return (
    <ul className="commentBodyContainer">
      {comments.map((comment) => (
        <li key={comment.id} className="commentItem">
          <strong>{comment.name || "Visitor"}</strong>
          <p>{comment.createdAt}</p>
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
  backend: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};
