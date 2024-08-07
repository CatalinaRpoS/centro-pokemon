import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nurse from "@pages/nurse.tsx";
import Trainer from "@pages/trainer.tsx";
import Register from "@pages/register.tsx";
import HomePage from "@pages/home-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/entrenador",
    element: <Trainer />,
  },
  {
    path: "/enfermera",
    element: <Nurse />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
]);

export const AppRouterProvider: React.FC<Record<string, never>> = () => (
  <RouterProvider router={router} />
);
