import { createContext, useContext, useEffect, useState } from "react";
import { blogApi } from "../api/blogApi";
import { BlogPost } from "../types/models";

interface BlogContextType {
  posts: BlogPost[];
  createPost: (post: Omit<BlogPost, "id">) => BlogPost;
  updatePost: (id: number, post: BlogPost) => void;
  deletePost: (id: number) => void;
  filteredPosts: BlogPost[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchedPosts = blogApi.getPosts();
    setPosts(fetchedPosts);
    setFilteredPosts(fetchedPosts);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = blogApi.searchPosts(searchQuery);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const createPost = (post: Omit<BlogPost, "id">): BlogPost => {
    const newPost = blogApi.createPost({
      ...post,
      imgUrl: post.imgUrl || null
    });
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
    <BlogContext.Provider
      value={{
        posts,
        createPost,
        updatePost,
        deletePost,
        filteredPosts,
        searchQuery,
        setSearchQuery
      }}
    >
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
