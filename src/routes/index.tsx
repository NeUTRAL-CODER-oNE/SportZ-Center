/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, Navigate } from "react-router-dom";

// import AccountLayout from "../layouts/account";
import Home from "../pages/Home";
// import ArticlesDetails from "../pages/articles/ArticlesDetails";
import ArticlesListItems from "../pages/articles/ArticlesDetailes";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace /> },

  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="/" replace /> },

      {
        path: "articles",
        children: [
          { index: true, element: <Navigate to="/" /> },
          {
            path: ":articlesID",
            children: [{ index: true, element: <ArticlesListItems /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
