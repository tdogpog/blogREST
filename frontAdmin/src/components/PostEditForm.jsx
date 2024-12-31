import PropTypes from "prop-types";

export default function PostEditForm({ postData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="formGroup">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={postData.content}
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label htmlFor="published">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={postData.published}
            onChange={handleChange}
          />
          Published
        </label>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}

PostEditForm.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
