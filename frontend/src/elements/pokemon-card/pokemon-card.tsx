import React from "react";
import { PokemonCardProps } from "./types";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="card pokemon-card">
      <div className="card-body d-flex justify-content-between pokemon-title">
        <h5 className="card-title">{pokemon.name}</h5>
        <h5 className="card-title">Nivel {pokemon.level}</h5>
      </div>
      <div className="card-body d-flex">
        <div className="d-flex flex-column pokemon-card-type">
          {pokemon.type.map((path, index) => (
            <div key={index}>
              <img className="pokemon-type" src={path} alt={path} />
            </div>
          ))}
        </div>
        <img src={pokemon.image} className="card-img pokemon-card-image" alt={pokemon.name} />
      </div>

      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <div className="flex-container">
            {pokemon.status.map((path, index) => (
              <div key={index}>
                <img className="pokemon-status" src={path.image} alt={path.name} />
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-danger pokemon-turn rounded-pill mt-auto mb-2">
          PV: {pokemon.lifePoints}
        </button>
        <button className="btn btn-primary pokemon-turn rounded-pill mt-auto">
          Turno {pokemon.turn}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
