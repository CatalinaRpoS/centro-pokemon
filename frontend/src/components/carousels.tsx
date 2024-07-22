
// Carrusel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import pokecenter from '../assets/PokeCenter.png';
import EnfermeraJoy from '../assets/EnfermeraJoy.jpg';
import EnfermeraJoy2 from '../assets/EnfermeraJoy2.jpg';


const Carrusel = () => {
      return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src= {pokecenter}
          alt="First slide"
        />
        <Carousel.Caption className='info'>
          <h3>Bienvenido a tu Centro Pokemon</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src= {EnfermeraJoy}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 img-responsive"
          src= {EnfermeraJoy2}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;