import React, { useState } from "react";
import NavBar from "@components/navbar";
import RegisterPokemon from "@components/register-pokemon";
import VisualizePokemon from "@components/visualize-pokemon";
import TableTurn from "@elements/table-turn";
import "@styles/styles.scss";
import prioritizePokemons from "@helpers/prioritize-pokemons";
import pokemones from "@mocks/pokemones";
import types from "@mocks/types";
import status from "@mocks/status";
import { Pokemon } from "src/types";

const Trainer: React.FC = () => {
  const [pokemons, setPokemons] = useState(pokemones);

  const handleRegister = (newPokemon: Pokemon) => {
    setPokemons((prevState) => [...prevState, newPokemon]);
  };

  const sortedPokemons = prioritizePokemons(pokemons);
  return (
    <>
      <NavBar />
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turnos</h2>
          <TableTurn pokemones={sortedPokemons} />
        </div>

        <div className="grid-container-form">
          <div className="item2">
            <h2 className="text-center">Registra tu Pokémon</h2>
            <RegisterPokemon types={types} 
              status={status} 
              currentTurn={sortedPokemons.length}
              onRegister={handleRegister} 
            />
          </div>

          <div className="item3">
            <h2 className="text-center">Mis Pokémones</h2>
            <VisualizePokemon pokemones={sortedPokemons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainer;
