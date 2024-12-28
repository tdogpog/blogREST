import PropTypes from "prop-types";

export default function NewPostForm({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
}) {
  return (
    <div className="newPostContent">
      <h1>New Post Creation</h1>
      <form onSubmit={handleSubmit} className="newPostForm">
        <div className="formNew">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Title"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the post content"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="submitButton">
          Create Post
        </button>
      </form>
    </div>
  );
}

NewPostForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
