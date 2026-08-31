import React from "react"

import { Link } from "react-router-dom"
import { blogApi } from "../api/blogApi"
import { getPlainTextExcerpt } from "../lib/utils"
import { Button } from "./ui/ButtonUi"
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/Card"

interface BlogPostCardProps {
  postId: number
}

export const defaultImage =
  "https://static.photos/abstract/300x200/21.webp?lock=21"

const BlogPostCard: React.FC<BlogPostCardProps> = ({ postId }) => {
  const post = blogApi.getPostById(postId)

  if (!post) {
    return null
  }

  const plainText = getPlainTextExcerpt(post.content)

  return (
    <Link to={`/posts/${post.id}`}>
      <Card className="flex flex-col cursor-pointer hover:shadow-lg">
        <div className="aspect-video">
          <img
            src={post.imgUrl || defaultImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full"
          />
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
  )
}

export default BlogPostCard
