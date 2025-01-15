import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Layout from "./components/Layout";

const backend = import.meta.env.VITE_API_KEY;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard backend={backend} />
      </Layout>
    ),
  },
  {
    path: "/:postID",
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
