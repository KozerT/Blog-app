import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { z } from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date) => {
  return format(date, "MMMM d, yyyy");
};

export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  imgUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  createdAt: z.string()
});
