import { useNavigate, useParams } from "react-router-dom"
import { defaultImage } from "../components/BlogPostCard"
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import { LayoutWrapper } from "../components/LayoutWrapper"
import { Button } from "../components/ui/ButtonUi"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card"
import { useBlog } from "../context/BlogContext"
import { formatDate } from "../lib/utils"

const BlogPostDetail: React.FC = () => {
  const { postId } = useParams()
  const { posts, deletePost } = useBlog()
  const navigate = useNavigate()
  const post = posts.find((p) => p.id === Number(postId))

  if (!post) {
    return (
      <LayoutWrapper>
        <p>Blog post not found</p>
      </LayoutWrapper>
    )
  }

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`)
  }

  const handleDelete = () => {
    deletePost(Number(postId))
    navigate("/")
  }

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
          <img
            src={post.imgUrl || defaultImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="float-left object-cover w-full h-full max-w-xs mb-4 mr-6 rounded-md sm:max-w-sm"
          />
          <section className="leading-8 tracking-wide ">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </section>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground"
          >
            Previous Page
          </Button>
        </CardFooter>
      </Card>
    </LayoutWrapper>
  )
}

export default BlogPostDetail
