import { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
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
      <div className="header">
        <Link to={"/dashboard"}>Back to Dashboard</Link>
      </div>
      <h1>Edit Post</h1>
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

//i'm sending this to backend with whatever body it has, but the data it grabbed doesnt contain
//comments from the original API call
// need to make sure this isnt telling the backend to just drop comments
// and instead its a deliberate update of differences

//UPDATE: prisma.x.update only updates the fields its given, we're good.
