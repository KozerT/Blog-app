import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/Form";
import { useBlog } from "../context/BlogContext";
import { blogPostSchema } from "../lib/utils";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { BlogPost } from "../types/models";

interface BlogPostFormProps {
  post?: BlogPost;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post }) => {
  const { createPost, updatePost } = useBlog();
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = !!postId;

  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      id: post?.id || Date.now(),
      title: post?.title || "",
      content: post?.content || "",
      imgUrl: post?.imgUrl || undefined,
      createdAt: post?.createdAt || new Date().toISOString()
    }
  });

  const onSubmit = async (values: z.infer<typeof blogPostSchema>) => {
    const postData = {
      ...values,
      imgUrl: values.imgUrl ? values.imgUrl : undefined,
      createdAt: new Date().toISOString()
    };
    if (isEditing) {
      updatePost(Number(postId), postData);
      navigate(`/posts/${postId}`);
    } else {
      const newPost = createPost(postData);
      navigate(`/posts/${newPost.id}`);
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription>The title of your blog post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter content" {...field} />
              </FormControl>
              <FormDescription>The content of your blog post</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-start gap-4">
          <Button type="submit">
            {isEditing ? "Update Post" : "Create Post"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;
