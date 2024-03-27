import { Suspense, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { ThemeContext } from "./context/theme";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <div className={`h-screen w-full ${theme === "dark" ? "dark" : ""}`}>
          <ArticlesProvider>
            <MatchesProvider>
              <SportsProvider>
                <TeamsProvider>
                  <RouterProvider router={router} />
                </TeamsProvider>
              </SportsProvider>
            </MatchesProvider>
          </ArticlesProvider>
        </div>
      </Suspense>
    </>
  );
}

export default App;
