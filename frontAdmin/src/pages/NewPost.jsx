import { useState } from "react";
import PropTypes from "prop-types";
import { authRequest } from "../api";

export default function NewPost({ backend }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const url = `${backend}admin/posts`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const confirm = confirm("Confirm submission?");
    try {
      const data = authRequest(url, "POST");

      if (!data.ok) {
        throw new Error("Failed to post new article");
      }
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="newPostContainer">
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

NewPost.propTypes = {
  backend: PropTypes.string.isRequired,
};
