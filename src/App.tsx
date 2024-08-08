import { Outlet } from "react-router-dom";
import { BlogContextProvider } from "./context/BlogContext";

function App() {
  return (
    <>
      <BlogContextProvider>
        <Outlet />
      </BlogContextProvider>
    </>
  );
}

export default App;
