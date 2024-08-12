import seedData from "../data/blog-app-seed.json";
import { BlogPost } from "../types/models";
import { getFromStorage, saveToStorage } from "./storage";

export const STORAGE_KEY = "blogPosts";

export const blogApi = {
  getPosts: (): BlogPost[] => getFromStorage(STORAGE_KEY, seedData),

  getPostById: (id: number): BlogPost | null =>
    blogApi.getPosts().find((post) => post.id === id) || null,

  createPost: (post: Omit<BlogPost, "id">): BlogPost => {
    const posts = blogApi.getPosts();
    const newPost = { ...post, id: Date.now() };
    const updatedPosts = [...posts, newPost];
    saveToStorage(STORAGE_KEY, updatedPosts);
    return newPost;
  },

  updatePost: (id: number, updatedPost: BlogPost): BlogPost | null => {
    const posts = blogApi.getPosts();
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;
    saveToStorage(STORAGE_KEY, updatedPosts);
    return updatedPost;
  },

  deletePost: (id: number): boolean => {
    const posts = blogApi.getPosts();
    const updatedPosts = posts.filter((post) => post.id !== id);
    if (posts.length === updatedPosts.length) return false;
    saveToStorage(STORAGE_KEY, updatedPosts);
    return true;
  },

  searchPosts: (query: string): BlogPost[] => {
    const posts = blogApi.getPosts();
    const lowercasedQuery = query.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowercasedQuery)
    );
  }
};
