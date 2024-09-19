import React from "react";
import { PokemonCardProps } from "./types";
import "@styles/pokemonCard.scss";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="card pokemon-card">
      <div className="card-body d-flex justify-content-between pokemon-title">
        <h5 className="card-title">{pokemon.name}</h5>
        <h5 className="card-title">Turno {pokemon.turn}</h5>
      </div>
      <div className="card-body body">
        <div className="pokemon-card-type d-flex">
          {/* {pokemon.type.map((path, index) => (
            <div key={index}>
              <img className="pokemon-type" src={path} alt={path} />
            </div>
          ))} */}
        </div>
        <div className="d-flex justify-content-center">
          <img src={pokemon.image} className="card-img pokemon-card-image" alt={pokemon.name} />
        </div>
      </div>
      <div className="card-body d-flex flex-column bottom">
        <div className="flex-grow-1">
          <div className="flex-container">
            {/* {pokemon.status.map((path, index) => (
              <div key={index}>
                <img className="pokemon-status" src={path.image} alt={path.name} />
              </div>
            ))} */}
          </div>
        </div>
        <div className="d-flex info">
          <div className="pokemon-lifePoint">
                PV {pokemon.life_points}
          </div>
          <div className="pokemon-turn">
                Nivel {pokemon.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
