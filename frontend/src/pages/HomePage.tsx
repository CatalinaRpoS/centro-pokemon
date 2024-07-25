import { NavBar } from "../components/NavBar";
import Carrusel from "../components/carousels";
import InfoPage from "../components/InfoPage";


export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="navbar-blue d-grid gap-2 d-md-flex justify-content-md-end"></div>
      <Carrusel />
      <InfoPage />
      <div className="navbar-blue d-grid gap-2 d-md-flex justify-content-md-end"></div>
    </div>
  );
};
