import { createContext, useContext, useEffect, useState } from "react";
import { blogApi } from "../api/blogApi";
import { BlogPost } from "../types/models";

interface BlogContextType {
  posts: BlogPost[];
  createPost: (post: Omit<BlogPost, "id">) => BlogPost;
  updatePost: (id: number, post: BlogPost) => void;
  deletePost: (id: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchedPosts = blogApi.getPosts();
    setPosts(fetchedPosts);
  }, []);

  const createPost = (post: Omit<BlogPost, "id">): BlogPost => {
    const newPost = blogApi.createPost(post);
    setPosts((prevPosts) => [...prevPosts, newPost]);
    return newPost;
  };

  const updatePost = (id: number, updatedPost: BlogPost) => {
    const updated = blogApi.updatePost(id, updatedPost);
    if (updated) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post))
      );
    }
  };

  const deletePost = (id: number) => {
    const deleted = blogApi.deletePost(id);
    if (deleted) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };
  return (
    <BlogContext.Provider value={{ posts, createPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
