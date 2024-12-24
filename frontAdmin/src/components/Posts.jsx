import { Link } from "react-router-dom";

export default function Posts({ posts }) {
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
