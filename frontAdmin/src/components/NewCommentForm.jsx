import PropTypes from "prop-types";

export default function NewCommentForm({
  handleCommentSubmit,
  handleCommentChange,
  commentData,
}) {
  return (
    <form onSubmit={handleCommentSubmit}>
      <div className="formGroup">
        <label htmlFor="commentName">Name:</label>
        <input
          type="text"
          id="commentName"
          name="commentName"
          value={commentData.commentName}
          onChange={handleCommentChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="commentContent">Comment:</label>
        <textarea
          id="commentContent"
          name="commentContent"
          value={commentData.commentContent}
          onChange={handleCommentChange}
          rows="5"
          cols="25"
        />
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  );
}

NewCommentForm.propTypes = {
  handleCommentSubmit: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  commentData: PropTypes.shape({
    commentName: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired,
  }).isRequired,
};
