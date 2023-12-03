import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Game1 from "./pages/Game1.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.scss"; //permet de distribuer les styles scss à toutes les pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/game1",
        element: <Game1 />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
