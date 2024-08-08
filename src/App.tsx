import { Outlet } from "react-router-dom";
import { BlogContextProvider } from "./context/BlogContext";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BlogContextProvider>
        <Header />
        <Outlet />
      </BlogContextProvider>
    </>
  );
}

export default App;
