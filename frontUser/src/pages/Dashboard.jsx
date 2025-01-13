import { useState, useEffect } from "react";
import { authRequest } from "../api";
import Posts from "../components/Posts";
import PropTypes from "prop-types";

export default function Dashboard({ backend }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const url = `${backend}posts`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await authRequest(url);

        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [url]);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="card">
      <div className="content">
        <div className="dashboardHeader">
          <h2>Posts</h2>
        </div>
        {posts.length > 0 ? <Posts posts={posts} /> : "No posts found"}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  backend: PropTypes.string.isRequired, // Validate that 'backend' is a required string
};
