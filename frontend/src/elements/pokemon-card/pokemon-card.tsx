import React, { useEffect, useState } from "react";
import { PokemonCardProps } from "./types";
import "@styles/pokemonCard.scss";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonImage = async (name: string): Promise<string | null> => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`No se ha encontrado la imagen del Pokémon ${name}`);
        }
        const data = await response.json();
        return data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
      } catch (error) {
        return null;
      }
    };

    const getImage = async () => {
      const image = await fetchPokemonImage(pokemon.name);
      setImageUrl(image);
    };

    getImage();
  }, [pokemon.name]);

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
          {imageUrl && <img src={imageUrl} alt={pokemon.name} className="card-img pokemon-card-image" />}
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
