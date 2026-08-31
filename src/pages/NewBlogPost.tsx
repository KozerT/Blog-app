import BlogPostForm from "../components/BlogPostForm";
import { LayoutWrapper } from "../components/LayoutWrapper";

const NewBlogPostPage = () => {
  return (
    <LayoutWrapper>
      <h2 className="mb-4 text-3xl font-bold">New Blog Post</h2>
      <BlogPostForm />
    </LayoutWrapper>
  );
};

export default NewBlogPostPage;
