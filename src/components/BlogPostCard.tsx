import React from "react";

// import { Link } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/Card";
import { blogApi } from "../api/blogApi";

interface BlogPostCardProps {
  postId: number;
}

const defaultImage = "https://picsum.photos/seed/21/300/200";

const BlogPostCard: React.FC<BlogPostCardProps> = ({ postId }) => {
  const post = blogApi.getPostById(postId);

  if (!post) {
    return null;
  }

  const excerpt = post.content.slice(0, 150) + "..."; //

  return (
    // <Link to={`/posts/${post.id}`}> ///  Blog POst page  as well -
    //   {" "}
    //   {/* Link to the detail page */}
    <Card className="cursor-pointer hover:shadow-lg">
      <div className="relative aspect-video">
        <img
          src={post.imgUrl ? post.imgUrl : defaultImage}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{excerpt}</p>
      </CardHeader>
    </Card>
    // </Link>
  );
};

export default BlogPostCard;
