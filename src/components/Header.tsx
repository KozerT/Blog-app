import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const showSearch = location.pathname === "/";

  useEffect(() => {
    if (showSearch) {
      localStorage.setItem("searchQuery", searchQuery);
    }
  }, [searchQuery, showSearch]);

  const handleSearch = () => {
    if (showSearch) {
      localStorage.setItem("searchQuery", searchQuery);
      navigate("/");
    }
  };

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
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 border rounded-md md:w-4/12"
          />
        )}
      </div>
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate("/create-post")}
      >
        Create Post
      </Button>
    </header>
  );
};

export default Header;
