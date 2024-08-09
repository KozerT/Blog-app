import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { LayoutWrapper } from "../components/LayoutWrapper";
import BlogPostForm from "../components/BlogPostForm";

const EditBlogPostPage = () => {
  const { postId } = useParams();
  const { posts } = useBlog();
  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return (
      <LayoutWrapper>
        <p>Blog post not found</p>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <h2 className="mb-4 text-3xl font-bold">Edit Blog Post</h2>
      <BlogPostForm post={post} />
    </LayoutWrapper>
  );
};

export default EditBlogPostPage;
