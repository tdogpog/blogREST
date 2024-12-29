import { useState, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react";

import { authRequest } from "../api";
import PropTypes from "prop-types";

export default function PostEdit({ backend }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { postID } = useParams();
  const post = state?.post;
  const url = `${backend}admin/posts/${postID}/edit`;

  const [postData, setPostData] = useState({ post });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!post) {
    return <div>Error: No post data available.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = confirm("Confirm edit changes?");
    if (isConfirmed) {
      try {
        const response = await authRequest(url, "PUT", post);
        if (!response.ok) {
          throw new Error("Failed to update or publish post");
        }
        alert("Update succesful");
        navigate(`/dashboard/${post.id}`);
      } catch (error) {
        console.log(error.message);
        alert(
          "Error occured while updating or publishing, check console for logs"
        );
      }
    }
  };

  return (
    <div>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={postData.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

PostEdit.propTypes = {
  backend: PropTypes.string.isRequired,
};

//i'm sending this to backend with whatever body it has, but the data it grabbed doesnt contain
//comments from the original API call
// need to make sure this isnt telling the backend to just drop comments
// and instead its a deliberate update of differences
