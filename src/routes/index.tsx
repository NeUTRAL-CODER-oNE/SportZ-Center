/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MatchDetails from "../pages/matches/MatchesDetailes";
import ArticlesDetails from "../pages/articles/ArticlesDetailes";
import Logout from "../pages/logout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Preferences from "../pages/preferences";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace /> },

  {
    path: "/user/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",

    element: <Home />,

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
      {
        path: "user/preferences",
        element: <Preferences />,
      },
    ],
  },
]);

export default router;
