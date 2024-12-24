import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authRequest } from "../api";

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

  function Posts() {
    return (
      <ul className="posContainer">
        {posts.map((post) => (
          <li key={post.id} className="post">
            <Link to={`/dashboard/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="card">
      <div className="content">
        <h2>Posts</h2>
        {posts.length > 0 ? <Posts /> : "No posts found"}
      </div>
    </div>
  );
}
