import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useBlog } from "../context/BlogContext";
import { Search } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, setSearchQuery, handleSearch } = useBlog();

  const showSearch = location.pathname === "/";
  const showCreatePost = location.pathname === "/create-post";

  useEffect(() => {
    if (showSearch) {
      const storedSearchQuery = localStorage.getItem("searchQuery");
      if (storedSearchQuery) {
        setSearchQuery(storedSearchQuery);
      }
    }
  }, [showSearch, setSearchQuery]);

  // const handleSearch = () => {
  //   if (showSearch) {
  //     localStorage.setItem("searchQuery", searchQuery);
  //     navigate("/");
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between px-10 py-4 shadow-sm bg-background">
      <Link to="/">
        <div className="text-2xl font-bold cursor-pointer text-primary">
          BlogApp
        </div>
      </Link>
      <div className="flex-1 mx-4">
        {showSearch && (
          <div className="relative ">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-4 py-2 pl-12 border rounded-md md:w-4/12"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={handleSearch}
              className="absolute inset-y-0 left-0 flex items-center rounded-r-none "
            >
              <Search className="flex w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      {!showCreatePost && (
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </Button>
      )}
    </header>
  );
};

export default Header;
