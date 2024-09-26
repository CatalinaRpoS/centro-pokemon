import React, { useEffect, useState } from "react";
import NavBar from "@components/navbar";
import RegisterPokemon from "@components/register-pokemon";
import VisualizePokemon from "@components/visualize-pokemon";
import TableTurn from "@elements/table-turn";
import "@styles/styles.scss";
import { routes } from "@config/api";
import { PokemonType } from "./types";
import { Type, Status } from "src/types";

const Trainer: React.FC = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [status, setStatus] = useState<Status[]>([]);

  const [pokemonTurns, setPokemonTurns] = useState([]);
  const [ownedPokemons, setOwnedPokemons] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(routes.trainer.types);
        if (!response.ok) {
          throw new Error("Failed to fetch types");
        }
        const data: Type[] = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(routes.trainer.status);
        if (!response.ok) {
          throw new Error("Failed to fetch status");
        }
        const data: Status[] = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchPokemonTurns = async () => {
      try {
        const response = await fetch(routes.trainer.turns);
        if (!response.ok) {
          throw new Error("Failed to fetch turns");
        }
        const data = await response.json();
        setPokemonTurns(data);
      } catch (error) {
        console.error("Error fetching turns:", error);
      }
    };

    fetchPokemonTurns();
  }, [refresh]);

  useEffect(() => {
    const fetchOwnedPokemons = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await fetch(`${routes.trainer.pokemons}/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch turns");
        }
        const data = await response.json();
        setOwnedPokemons(data);
      } catch (error) {
        console.error("Error fetching turns:", error);
      }
    };

    fetchOwnedPokemons();
  }, [refresh]);

  const handleRegister = async (newPokemon: PokemonType) => {
    try {
      const response = await fetch(routes.trainer.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPokemon),
      });
      if (!response.ok) {
        throw new Error("Error creating pokemon");
      }
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error creating pokemon:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turnos</h2>
          <TableTurn pokemones={pokemonTurns} />
        </div>

        <div className="grid-container-form">
          <div className="item2">
            <h2 className="text-center">Registra tu Pokémon</h2>
            <RegisterPokemon
              pokemonTypes={types}
              pokemonStatus={status}
              currentTurn={pokemonTurns.length}
              onRegister={handleRegister}
            />
          </div>

          <div className="item3">
            <h2 className="text-center">Mis Pokémones</h2>
            <VisualizePokemon pokemones={ownedPokemons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainer;
