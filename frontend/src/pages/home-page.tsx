import React from "react";
import NavBar from "@components/navbar";
import Carousel from "@components/carousel";
import InfoPage from "@components/info-page";

const HomePage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <InfoPage />
      <div className="navbar-blue d-grid gap-2 d-md-flex justify-content-md-end"></div>
    </div>
  );
};

export default HomePage;
