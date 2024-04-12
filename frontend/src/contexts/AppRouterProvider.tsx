import { App } from "../App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Nurse } from "../pages/Nurse.tsx";
import { Trainer } from "../pages/Trainer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/entrenador",
    element: <Trainer />,
  },
  {
    path: "/enfermera",
    element: <Nurse />,
  },
]);

export const AppRouterProvider: React.FC<Record<string, never>> = () => (
  <RouterProvider router={router} />
);
