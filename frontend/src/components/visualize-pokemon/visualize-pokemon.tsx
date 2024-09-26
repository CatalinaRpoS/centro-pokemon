import React, { useEffect, useState } from "react";
import { PokemonCard } from "@elements/pokemon-card";
import { VisualizePokemonProps } from "./types";
import "@styles/styles.scss";
import Paginate from "@components/paginate/paginate";

const VisualizePokemon: React.FC<VisualizePokemonProps> = ({ pokemones }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonesPerPage, setPokemonesPerPage] = useState(6);

  const updatePokemonesPerPage = () => {
    if (window.innerWidth < 840) {
      setPokemonesPerPage(2);
    } else if (window.innerWidth < 1100) {
      setPokemonesPerPage(4);
    } else {
      setPokemonesPerPage(6);
    }
  };

  useEffect(() => {
    // Configura el número inicial de cartas por página
    updatePokemonesPerPage();

    // Agrega un listener para cambiar el número de cartas por página cuando la ventana cambie de tamaño
    window.addEventListener("resize", updatePokemonesPerPage);

    // Limpia el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", updatePokemonesPerPage);
  }, []);

  // Calcula los índices de los pokemones a mostrar en la página actual
  const indexOfLastPokemon = currentPage * pokemonesPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonesPerPage;
  const currentPokemones = pokemones.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="grid-container-cards">
        {currentPokemones.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} currentTurn={index+1} />
        ))}
      </div>
      <Paginate
        pokemonesPerPage={pokemonesPerPage}
        totalPokemones={pokemones.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default VisualizePokemon;
