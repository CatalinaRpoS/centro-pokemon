import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Nurse } from "../pages/Nurse.tsx";
import { Trainer } from "../pages/Trainer.tsx";
import { Register } from "../pages/Register.tsx";
import { HomePage } from "../pages/HomePage.tsx";

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
