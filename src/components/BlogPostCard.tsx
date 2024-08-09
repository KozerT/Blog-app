import React from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { blogApi } from "../api/blogApi";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import LazyLoad from "react-lazyload";
import { getPlainTextExcerpt } from "../lib/utils";

interface BlogPostCardProps {
  postId: number;
}

export const defaultImage = "https://picsum.photos/seed/21/300/200";

const BlogPostCard: React.FC<BlogPostCardProps> = ({ postId }) => {
  const post = blogApi.getPostById(postId);

  if (!post) {
    return null;
  }

  const plainText = getPlainTextExcerpt(post.content);

  return (
    <Link to={`/posts/${post.id}`}>
      <Card className="flex flex-col cursor-pointer hover:shadow-lg">
        <div className="aspect-video">
          <LazyLoad
            height={200}
            offset={100}
            placeholder={<div>Loading...</div>}
          >
            <img
              src={post.imgUrl || defaultImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </LazyLoad>
        </div>

        <CardHeader className="flex-1 text-wrap">
          <CardTitle className="min-h-20 ">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-4">
            {plainText}
          </p>
        </CardHeader>
        <CardFooter className="self-end mt-4">
          <Button variant="link">Read More</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
