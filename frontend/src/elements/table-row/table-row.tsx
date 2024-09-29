import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PokemonCard } from "@elements/pokemon-card";
import { baseUrl, routes } from "@config/api";
import { IDragResult } from "./types";
import { Pokemon, Status } from "src/types";
import "@styles/styles.scss";
import io from "socket.io-client";

const socket = io(baseUrl);

const TableRow: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const response = await fetch(routes.nurse);
        if (!response.ok) {
          throw new Error("Failed to fetch pokemones");
        }
        const data: Pokemon[] = await response.json();
        setPokemones(data);
      } catch (error) {
        console.error("Error fetching pokemones:", error);
      }
    };

    fetchPokemones();
  }, []);

  useEffect(() => {
    socket.on("turnsListUpdated", (newTurnsList: Pokemon[]) => {
      setPokemones(newTurnsList);
    });

    return () => {
      socket.off("turnsListUpdated");
    };
  }, []);

  const [selectedTurnIndex, setSelectedTurnIndex] = useState<number | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const isTurnsListEmpty = pokemones.length === 0;

  const onDragEnd = (result: IDragResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newTurnsList = [...pokemones];
    const [removed] = newTurnsList.splice(source.index, 1);
    newTurnsList.splice(destination.index, 0, removed);

    const updatedTurnsList = newTurnsList.map((pokemon, index) => ({
      ...pokemon,
      turn: pokemones[index].turn,
    }));

    setPokemones(updatedTurnsList);
    socket.emit("updateTurnsList", updatedTurnsList);
  };

  const handleDetailsClick = (index: number) => {
    setSelectedTurnIndex(index);
  };

  const getPokemonByTurn = (turno: number | string) => {
    return pokemones.find((pokemon: Pokemon) => pokemon.turn === turno);
  };

  const selectedPokemon =
    pokemones.length > 0
      ? selectedTurnIndex !== null
        ? getPokemonByTurn(selectedTurnIndex)
        : getPokemonByTurn(pokemones[0].turn)
      : null;

  const removeFirstPokemon = () => {
    setPokemones((prevTurnsList) => {
      if (prevTurnsList.length === 0) return prevTurnsList;
      const removedPokemon = prevTurnsList[0].id;
      const updatedTurnsList = prevTurnsList.slice(1).map((pokemon, index) => ({
        ...pokemon,
        turn: pokemones[index].turn,
      }));
      socket.emit("updateTurnsList", updatedTurnsList, removedPokemon);
      return updatedTurnsList;
    });
  };

  return (
    <>
      <div
        className={`d-flex-container-nurse ${
          isTurnsListEmpty ? "full-width" : ""
        }`}
      >
        {!isTurnsListEmpty && (
          <div
            className="d-flex justify-content-center item-pokemon mt-3"
            ref={cardRef}
          >
            {selectedPokemon && (
              <PokemonCard 
                pokemon={selectedPokemon} 
                currentTurn={pokemones.indexOf(selectedPokemon) + 1} 
              />
            )}
          </div>
        )}
        <div className="table-wrapper table-turnos mt-3">
          <DragDropContext onDragEnd={onDragEnd}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Turno</th>
                  <th scope="col">Pokémon</th>
                  <th scope="col">Nivel</th>
                  <th scope="col">PV</th>
                  <th scope="col">Estado Actual</th>
                  <th scope="col">Entrenador</th>
                </tr>
              </thead>
              <Droppable droppableId="tasks">
                {(droppableProvider) => (
                  <tbody
                    {...droppableProvider.droppableProps}
                    ref={droppableProvider.innerRef}
                  >
                    {pokemones.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center">
                          No hay Pokémons esperando, puedes descansar.
                        </td>
                      </tr>
                    ) : (
                      pokemones.map((pokemon, index) => (
                        <Draggable
                          key={pokemon.turn}
                          draggableId={pokemon.turn.toString()}
                          index={index}
                        >
                          {(draggableProvider) => (
                            <tr
                              {...draggableProvider.draggableProps}
                              {...draggableProvider.dragHandleProps}
                              ref={draggableProvider.innerRef}
                              className="tasks-item"
                              onClick={() => handleDetailsClick(pokemon.turn)}
                            >
                              <td>{index+1}</td>
                              <td>{pokemon.name}</td>
                              <td>{pokemon.level}</td>
                              <td>{pokemon.life_points}</td>
                              <td>
                                {pokemon.pokemon_status
                                  ? pokemon.pokemon_status
                                      .map((s: Status) => s.name)
                                      .join(", ")
                                  : " "}
                              </td>
                              <td>{pokemon.trainer_fullname}</td>
                            </tr>
                          )}
                        </Draggable>
                      ))
                    )}
                    {droppableProvider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
        </div>
      </div>

      <div className="button-container">
        <button
          className="btn btn-primary btn-md justify-content-center rounded-pill mb-4"
          type="button"
          onClick={() => removeFirstPokemon()}
        >
          Atender siguiente turno
        </button>
      </div>
    </>
  );
};

export default TableRow;
