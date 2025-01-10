import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { authRequest } from "../api";
import NewPostForm from "../components/NewPostForm";

export default function NewPost({ backend }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = `${backend}admin/posts`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const confirmation = confirm("Confirm submission?");
    if (!confirmation) return;
    try {
      const payload = { title, content, published };
      const data = await authRequest(url, "POST", payload);

      console.log("test on data in making new post", data);

      if (!data) {
        throw new Error("Failed to post new article");
      }
      setTitle("");
      setContent("");
      setPublished(false);
      navigate("/dashboard");
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
        published={published}
        setPublished={setPublished}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

NewPost.propTypes = {
  backend: PropTypes.string.isRequired,
};
