import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PokemonCard } from "@elements/pokemon-card";
import { IDragResult } from "./types";
import { Pokemon } from "src/types";
import "@styles/styles.scss";
import io from "socket.io-client";

const socket = io('http://localhost:3000');

const TableRow: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const response = await fetch('http://localhost:3000/nurse/');
        if (!response.ok) {
          throw new Error('Failed to fetch pokemones');
        }
        const data: Pokemon[] = await response.json();
        setPokemones(data);
        console.log(pokemones);
      } catch (error) {
        console.error('Error fetching pokemones:', error);
      }
    };

    socket.on('turnsListUpdated', (newTurnsList: Pokemon[]) => {
      setPokemones(newTurnsList);
    });
    return () => {
      socket.off('turnsListUpdated');
    };

    fetchPokemones();
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
    
    newTurnsList.forEach((pokemon, index) => {
      pokemon.turn = index + 1;
    });
    
    setPokemones(newTurnsList);
    socket.emit('updateTurnsList', newTurnsList);
  };
  
  const handleDetailsClick = (index: number) => {
    setSelectedTurnIndex(index);
  };
  
  const getPokemonByTurn = (turno: number | string) => {
    return pokemones.find((pokemon: Pokemon) => pokemon.turn === turno);
  };
  
  const selectedPokemon =
  pokemones.length > 0
    ? (selectedTurnIndex !== null ? getPokemonByTurn(selectedTurnIndex) : getPokemonByTurn(pokemones[0].turn))
    : null;
  
  const removeFirstPokemon = () => {
    setPokemones((prevTurnsList) => {
      if (prevTurnsList.length === 0) return prevTurnsList;
      const updatedTurnsList = prevTurnsList.slice(1).map((turn, index) => ({
        ...turn,
        turn: index + 1,
      }));
      socket.emit('updateTurnsList', updatedTurnsList);
      return updatedTurnsList;
    });
  };
  
  return (
    <>
    <div className={`d-flex-container-nurse ${isTurnsListEmpty ? "full-width" : ""}`}>
    {!isTurnsListEmpty && (
          <div
            className="d-flex justify-content-center item-pokemon mt-3"
            ref={cardRef}
          >
            {selectedPokemon && <PokemonCard pokemon={selectedPokemon} />}
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
              <td>{pokemon.turn}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.level}</td>
              <td>{pokemon.life_points}</td>
              <td>
              {/* {pokemon.status
                .map((s: Status) => s.name)
                .join(", ")} */}
              </td>
              <td>{pokemon.trainer_email}</td>
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
      className="btn btn-primary btn-md justify-content-center rounded-pill"
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
  