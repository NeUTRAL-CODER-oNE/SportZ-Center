/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MatchDetails from "../pages/matches/MatchesDetailes";
import ArticlesDetails from "../pages/articles/ArticlesDetailes";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace /> },

  {
    path: "/",
    element: (
        <Home />
    ),
    children: [
      { index: true, element: <></> },
      {
        path: "match",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":id",
            element: <MatchDetails />,
          },
        ],
      },
      {
        path: "article",
        children: [
          { index: true, element: <Navigate to="/" replace /> },
          {
            path: ":id",
            element: <ArticlesDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
