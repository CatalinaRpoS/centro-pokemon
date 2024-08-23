import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import "@styles/home-page.scss";

const AllCollapse: React.FC = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0" className='faq-item p'>
        <Accordion.Header> ¿Puedo usar los computadores del Centro Pokémon para gestionar mis Pokémon?</Accordion.Header>
        <Accordion.Body>
        ¡Claro! Los computadores en el Centro Pokémon te permiten almacenar, organizar y retirar tus Pokémon de forma segura. 
        Simplemente acércate al equipo que encuentres disponible, selecciona la opción de almacenamiento, y podrás mover tus Pokémon 
        entre las cajas del computador y tu equipo actual.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className='faq-item p'>
        <Accordion.Header>¿Hay algún lugar en el Centro Pokémon donde los entrenadores puedan descansar?</Accordion.Header>
        <Accordion.Body>
        Sí, muchos Centros Pokémon cuentan con una zona de descanso donde los entrenadores pueden relajarse
         y socializar con otros entrenadores. Aquí puedes planificar tus próximas estrategias y compartir 
         experiencias con amigos y compañeros de viaje.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className='faq-item p'>
        <Accordion.Header> ¿Qué debo hacer si mi Pokémon tiene una enfermedad o condición especial que no se cura con una visita normal al Centro Pokémon?</Accordion.Header>
        <Accordion.Body>
        Si tu Pokémon tiene una enfermedad o condición especial, te recomendamos hablar 
        con la enfermera Joy en el Centro Pokémon. Ella podrá proporcionarte información sobre
        tratamientos específicos o dirigirte a un especialista que pueda ayudar a tu Pokémon a 
        recuperarse por completo.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapse;