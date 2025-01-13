import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Layout from "./components/Layout";

const backend = "http://localhost:3000/";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard backend={backend} />
      </Layout>
    ),
  },
  {
    path: "/dashboard/:postID",
    element: (
      <Layout>
        <Post backend={backend} />
      </Layout>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
