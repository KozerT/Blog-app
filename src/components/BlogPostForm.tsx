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
import {
  BtnAlignCenter,
  BtnAlignLeft,
  BtnAlignRight,
  BtnAlignJustify,
  BtnUnderline,
  Button
} from "./ui/ButtonUi";
import { BlogPost } from "../types/models";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar
} from "react-simple-wysiwyg";
import { useState } from "react";

interface BlogPostFormProps {
  post?: BlogPost;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post }) => {
  const [content, setContent] = useState(post?.content || "");
  const { createPost, updatePost } = useBlog();
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = !!postId;

  const updatedBlogPostSchema = blogPostSchema.extend({
    content: z
      .string()
      .min(150, { message: "Content must be at least 150 characters" })
  });

  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(updatedBlogPostSchema),
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
      content,
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
                <EditorProvider>
                  <Editor
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      field.onChange(e);
                    }}
                  >
                    <Toolbar>
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnAlignLeft />
                      <BtnAlignCenter />
                      <BtnAlignRight />
                      <BtnAlignJustify />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              </FormControl>
              <FormDescription>
                The content of your blog post (minimum 150 characters)
              </FormDescription>
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
