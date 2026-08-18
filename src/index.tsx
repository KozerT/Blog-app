import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import BlogPostDetail from "./pages/BlogPostDetail";
import BlogPostList from "./pages/BlogPostList";
import EditBlogPostPage from "./pages/EditBlogPost";
import NewBlogPostPage from "./pages/NewBlogPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <BlogPostList /> },
      {
        path: "/posts/:postId",
        element: <BlogPostDetail />,
      },
      {
        path: "/create-post",
        element: <NewBlogPostPage />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditBlogPostPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
