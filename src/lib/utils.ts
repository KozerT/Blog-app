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

export const getPlainTextExcerpt = (
  htmlString: string,
  maxLength: number = 150
) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  let textContent = tempDiv.textContent || "";
  textContent = textContent.replace(/<b>(.*?)<\/b>/g, "<strong>$1</strong>");
  textContent = textContent.replace(/<i>(.*?)<\/i>/g, "<em>$1</em>");
  if (textContent.length > maxLength) {
    textContent = textContent.substring(0, maxLength) + "...";
  }

  return textContent;
};

export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  imgUrl: z.string().url({ message: "Invalid URL format" }).optional(),
  createdAt: z.string()
});
