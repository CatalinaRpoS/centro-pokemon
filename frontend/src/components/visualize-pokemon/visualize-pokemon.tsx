import React from "react";
import { PokemonCard } from "@elements/pokemon-card";
import { VisualizePokemonProps } from "./types";
import "@styles/styles.scss";

const VisualizePokemon: React.FC<VisualizePokemonProps> = ({ pokemones }) => {
  return (
    <div className="grid-container-cards">
      {pokemones.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default VisualizePokemon;