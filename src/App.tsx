import { BlogContextProvider } from "./context/BlogContext";
import { BlogPostList } from "./pages/BlogPostList";

function App() {
  return (
    <>
      <BlogContextProvider>
        <BlogPostList />
      </BlogContextProvider>
    </>
  );
}

export default App;
