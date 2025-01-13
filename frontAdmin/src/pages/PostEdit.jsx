import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authRequest } from "../api";
import PropTypes from "prop-types";
import PostEditForm from "../components/PostEditForm";

export default function PostEdit({ backend }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { postID } = useParams();
  const post = state?.post;
  const url = `${backend}admin/${postID}`;

  const [postData, setPostData] = useState({
    title: post.title || "",
    content: post.content || "",
    published: post?.published || false,
  });

  //checked is the value of the checkbox type
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = confirm("Confirm edit changes?");
    if (isConfirmed) {
      try {
        await authRequest(url, "PUT", postData);

        alert("Update succesful");
        navigate(`/dashboard`);
      } catch (error) {
        console.log(error.message);
        alert(
          "Error occured while updating or publishing, check console for logs"
        );
      }
    }
  };

  if (!post) {
    return <div>Error: No post data available.</div>;
  }

  return (
    <div className="postEditor">
      <PostEditForm
        postData={postData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

PostEdit.propTypes = {
  backend: PropTypes.string.isRequired,
};
