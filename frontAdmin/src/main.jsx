import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import PostEdit from "./pages/PostEdit";

const isAuthenticated = () => {
  console.log('IS AUTH CHECK',localStorage.getItem('token'))

  return !!localStorage.getItem("token"); // Check for an auth token
};

const backend = "http://localhost:3000/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login backend={backend} />,
  },
  {
    path: "/dashboard",
    element: isAuthenticated() ? (
      <Dashboard backend={backend} />
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "/dashboard/:postID",
    element: isAuthenticated() ? (
      <Post backend={backend} />
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "/dashboard/:postID/edit",
    element: isAuthenticated() ? (
      <PostEdit backend={backend} />
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "/dashboard/new",
    element: isAuthenticated() ? (
      <NewPost backend={backend} />
    ) : (
      <Navigate to="/" />
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
