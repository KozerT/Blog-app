import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../components/ui/Card";
import { LayoutWrapper } from "../components/LayoutWrapper";
import { formatDate } from "../lib/utils";
import { defaultImage } from "../components/BlogPostCard";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams();
  const { posts, deletePost } = useBlog();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return (
      <LayoutWrapper>
        <p>Blog post not found</p>
      </LayoutWrapper>
    );
  }

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = () => {
    deletePost(Number(postId));
    navigate("/");
  };

  return (
    <LayoutWrapper>
      <Card className="prose border-0 shadow-none lg:prose-xl">
        <CardHeader>
          <hr className="mb-2" />
          <div className="flex justify-end gap-6">
            <Button variant="outline" onClick={handleEdit}>
              Edit Post
            </Button>
            <DeleteConfirmationModal onConfirm={handleDelete} />
          </div>
          <CardTitle className="text-4xl ">{post.title}</CardTitle>
          <p className="mb-2 italic text-muted-foreground">
            Posted on&nbsp;{formatDate(new Date(post.createdAt))}
          </p>
        </CardHeader>
        <CardContent>
          <LazyLoad
            height={200}
            offset={100}
            placeholder={<div>Loading...</div>}
          >
            <img
              src={post.imgUrl || defaultImage}
              alt={post.title}
              className="float-left object-cover w-full h-full max-w-xs mb-4 mr-6 rounded-md sm:max-w-sm"
            />
          </LazyLoad>
          <section className="leading-8 tracking-wide ">
            <p>{post.content}</p>
          </section>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            Previous Page
          </Button>
        </CardFooter>
      </Card>
    </LayoutWrapper>
  );
};

export default BlogPostDetail;
