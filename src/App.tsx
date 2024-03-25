import { Suspense, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { ThemeContext } from "./context/theme";
import { ArticlesProvider } from "./context/articles/context";
import { MatchesProvider } from "./context/matches/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";
import { PreferencesProvider } from "./context/preferences/context";

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
                  <PreferencesProvider>
                    <RouterProvider router={router} />
                  </PreferencesProvider>
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
