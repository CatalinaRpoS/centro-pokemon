import React from "react";
import { TableTurnProps } from "./types";

const TableTurn: React.FC<TableTurnProps> = ({ pokemones }) => {
  const firstFivePokemons = pokemones.slice(0, 5);

  return (
    <table className="table table-striped mt-5 mb-5 text-center">
      <thead>
        <tr>
          <th scope="col">Turno</th>
          <th scope="col">Pokémon</th>
        </tr>
      </thead>
      <tbody>
      {firstFivePokemons.map((pokemon) => (
          <tr key={pokemon.turn}>
            <th scope="row">{pokemon.turn}</th>
            <td>{pokemon.name}</td>
          </tr>
      ))}
      </tbody>
    </table>
  );
};

export default TableTurn;