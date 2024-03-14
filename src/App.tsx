import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { ThemeContext } from "./context/theme";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`h-screen w-full ${theme === "dark" ? "dark" : ""}`}>
        <ArticlesProvider>
          <MatchesProvider>
            <RouterProvider router={router} />
          </MatchesProvider>
        </ArticlesProvider>
      </div>
    </>
  );
}

export default App;
