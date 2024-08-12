import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@pages/home";
import Trainer from "@pages/trainer";
import Nurse from "@pages/nurse";
import Register from "@pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/trainer",
    element: <Trainer />,
  },
  {
    path: "/nurse",
    element: <Nurse />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export const AppRouterProvider: React.FC<Record<string, never>> = () => (
  <RouterProvider router={router} />
);
