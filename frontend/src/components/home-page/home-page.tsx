import NavBar from "@components/navbar";
import Carousel from "@components/carousel";
import InfoPage from "@components/info-page";

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Carousel />
      <InfoPage />
    </>
  );
};

export default HomePage;