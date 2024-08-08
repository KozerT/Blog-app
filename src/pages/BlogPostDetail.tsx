import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "../components/ui/Card";
import { LayoutWrapper } from "../components/LayoutWrapper";
import { formatDate } from "../lib/utils";

const BlogPostDetail: React.FC = () => {
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
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {formatDate(new Date(post.createdAt))}
          </p>
          {post.imgUrl && (
            <img src={post.imgUrl} alt={post.title} className="my-4" />
          )}
          <p>{post.content}</p>
          {/* Edit and Delete buttons bellow */}
        </CardContent>
      </Card>
    </LayoutWrapper>
  );
};

export default BlogPostDetail;
