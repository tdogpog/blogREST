import { useState } from "react";
import PropTypes from "prop-types";
import { authRequest } from "../api";
import NewPostForm from "../components/NewPostForm";

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
      <NewPostForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

NewPost.propTypes = {
  backend: PropTypes.string.isRequired,
};
