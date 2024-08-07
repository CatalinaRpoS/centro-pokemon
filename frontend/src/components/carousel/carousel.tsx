import React from 'react';
import { Carousel } from 'react-bootstrap';
import { trainer, pokemonPikachu, pokemonBulbasaur } from '@assets/wallpaper';
import '@styles/home-page.scss';

const CustomCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src={pokemonPikachu}
          alt="First slide"
        
        />
        <Carousel.Caption >
          <h1 className='carousels-title'> ¡Bienvenido al Centro Pokémon! </h1>
          <p className='carousels-p'>Permítenos ayudarte a que tus Pokémon estén siempre en su mejor forma para tus próximas aventuras. ¡Estamos encantados de tenerte aquí!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src={trainer}
          alt="Second slide"
        
        />
        <Carousel.Caption  >
          <h1 className='carousels-title '> ¡Aquí nos preocupamos por tus Pokémon tanto como tú! </h1>
          <p className='carousels-p'>Nuestro equipo está dedicado a ofrecerte el mejor servicio y cuidado para que tus aventuras nunca se detengan. ¡Nos alegra que estés aquí!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src={pokemonBulbasaur}
          alt="Third slide"
          
        />
        <Carousel.Caption >
          <h1 className='carousels-title '> Tu viaje es importante para nosotros </h1>
          <p className='carousels-p'>queremos asegurarnos de que tus Pokémon estén siempre listos para cualquier desafío. ¡Gracias por elegirnos!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
