import PropTypes from "prop-types";
export default function Comments({ comments }) {
  return (
    <ul className="commentBodyContainer">
      {comments.map((comment) => (
        <li key={comment.id} className="commentItem">
          <strong>{comment.name || "Visitor"}</strong>
          <p>{comment.createdAt}</p>
          <p>{comment.content}</p>
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
};
