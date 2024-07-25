
// Carrusel.js
import React from 'react';
import "../styles/HomePage.scss";
import AllCollapse from "../elements/accordion";


const InfoPage = () => {
      return ( 
    <section>
      <div className="faq-container">
        <div className="faq-item">
          <h3 className='faq-item h3'>¿Quienes Somos?</h3>
          <div>
            <div className="line"></div>
          </div>
          <p className='faq-item p'>
            En el Centro Pokémon, somos tu aliado confiable para el cuidado y la preparación
             de tus Pokémon. Nos dedicamos a proporcionar servicios esenciales, incluyendo la 
             curación gratuita de tus Pokémon, acceso al sistema mediante nuestra PC, 
             Nuestro objetivo es ser un punto estratégico de descanso y preparación, 
             asegurando el bienestar de tu equipo Pokémon y apoyándote en cada paso de tu aventura. 
             ¡Ven a conocernos y experimenta la dedicación y cuidado que ofrecemos a todos los entrenadores 
             Pokémon!</p>
        </div>
        <div className="faq-item">
          <h3 className='faq-item h3' >Preguntas Frecuentes</h3>
          <div className="line"></div>
          <p></p>
          <AllCollapse />
        </div>
      </div>
    </section>
    );
  };
  

export default InfoPage;