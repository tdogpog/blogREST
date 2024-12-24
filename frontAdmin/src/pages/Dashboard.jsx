import { useState, useEffect } from "react";
import { authRequest } from "../api";
import Posts from "../components/Posts";

export default function Dashboard({ backend }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const url = `${backend}admin/posts`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await authRequest(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    };
    fetchPosts();
  }, [url]);

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <div className="card">
      <div className="content">
        <h2>Posts</h2>
        {posts.length > 0 ? <Posts posts={posts} /> : "No posts found"}
      </div>
    </div>
  );
}
