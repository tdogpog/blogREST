import PropTypes from "prop-types";
export default function Comments({ comments }) {
  //helper func to convert the time
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.max(Math.floor((now - past) / 1000), 0);
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
      {comments.length === 0 ? (
        <p>Nothing here!</p>
      ) : (
        comments.map((comment) => (
          <li key={comment.id} className="commentItem">
            <strong>{comment.name || "Visitor"}</strong>
            <p>{timeAgo(comment.createdAt)}</p>
            <p>{comment.content}</p>
          </li>
        ))
      )}
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
