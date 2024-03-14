/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, Navigate } from "react-router-dom";

// import AccountLayout from "../layouts/account";
import Home from "../pages/Home";

const router = createBrowserRouter([
  { path: "*", element: <Navigate to="/" replace /> },

  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
