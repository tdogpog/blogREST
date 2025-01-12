import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import PostEdit from "./pages/PostEdit";

const backend = "http://localhost:3000/";

//dynamic check
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login backend={backend} />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard backend={backend} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/:postID",
    element: (
      <ProtectedRoute>
        <Post backend={backend} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/:postID/edit",
    element: (
      <ProtectedRoute>
        <PostEdit backend={backend} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/new",
    element: (
      <ProtectedRoute>
        <NewPost backend={backend} />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React node and required
};
