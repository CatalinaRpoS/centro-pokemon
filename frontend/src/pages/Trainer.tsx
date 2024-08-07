import React from "react";
import NavBar from "@components/navbar";
import RegisterPokemon from "@components/register-pokemon";
import VisualizePokemon from "@components/visualize-pokemon";
import TableTurn from "@elements/table-turn";
import "@styles/styles.scss";

const Trainer: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="navbar-blue"></div>
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turno Actual</h2>
          <TableTurn />
        </div>
        <div className="item2">
          <h2 className="text-center">Mis Pokémones</h2>
          <VisualizePokemon />
        </div>
        <div className="item3">
          <h2 className="text-center">Registra tu Pokémon</h2>
          <RegisterPokemon />
        </div>
      </div>
    </>
  );
};

export default Trainer;
