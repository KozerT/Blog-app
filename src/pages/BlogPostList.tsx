import { useEffect, useState } from "react";
import BlogPostCard from "../components/BlogPostCard";
import { LayoutWrapper } from "../components/LayoutWrapper";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis
} from "../components/ui/Pagination";
import { useBlog } from "../context/BlogContext";
import { usePagination } from "../hooks/usePagination";
import { BlogPost } from "../types/models";

interface BlogPostListProps {
  postsPerPage?: number;
}

export const BlogPostList: React.FC<BlogPostListProps> = ({
  postsPerPage = 6
}) => {
  const { posts } = useBlog();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getVisiblePages
  } = usePagination(filteredPosts.length, postsPerPage);

  useEffect(() => {
    const searchQuery = localStorage.getItem("searchQuery") || "";
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercasedQuery) ||
          post.content.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts]);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const visiblePages = getVisiblePages();

  return (
    <LayoutWrapper>
      <div className="grid grid-cols-1 gap-8 mb-24 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <BlogPostCard key={post.id} postId={post.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination aria-label="Pagination">
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {visiblePages[0] > 1 && (
              <>
                <PaginationItem className="cursor-pointer">
                  <PaginationLink onClick={() => goToPage(1)} disabled={false}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {visiblePages.map((page) => (
              <PaginationItem className="cursor-pointer" key={page}>
                <PaginationLink
                  onClick={() => goToPage(page)}
                  isActive={page === currentPage}
                  disabled={false}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className="cursor-pointer">
                  <PaginationLink
                    onClick={() => goToPage(totalPages)}
                    disabled={false}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </LayoutWrapper>
  );
};
