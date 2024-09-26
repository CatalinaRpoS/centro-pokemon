import React from "react";
import "@styles/styles.scss";
import { TableTurnProps } from "./types";

const TableTurn: React.FC<TableTurnProps> = ({ pokemones }) => {
  const firstFivePokemons = pokemones.slice(0, 5);

  return (
    <div className="table-wrapper">
    <table className="table table-striped mt-2 mb-5 text-center">
      <thead>
        <tr>
          <th scope="col">Turno</th>
          <th scope="col">Pokémon</th>
        </tr>
      </thead>
      <tbody>
      {firstFivePokemons.map((pokemon, index) => (
          <tr key={pokemon.turn}>
            <th scope="row">{index+1}</th>
            <td>{pokemon.name}</td>
          </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableTurn;