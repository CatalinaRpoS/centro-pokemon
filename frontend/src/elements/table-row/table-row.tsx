import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { PokemonCard } from "@elements/pokemon-card";
import { TableRowProps, IDragResult } from "./types";
import { Pokemon, Status } from "src/types";
import "@styles/styles.scss";

const TableRow: React.FC<TableRowProps> = ({ pokemones }) => {
  const [turnsList, setTurnsList] = useState<Pokemon[]>(pokemones);
  const [selectedTurnIndex, setSelectedTurnIndex] = useState<number | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const onDragEnd = (result: IDragResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newTurnsList = [...turnsList];
    const [removed] = newTurnsList.splice(source.index, 1);
    newTurnsList.splice(destination.index, 0, removed);

    newTurnsList.forEach((pokemon, index) => {
      pokemon.turn = index + 1;
    });

    setTurnsList(newTurnsList);
  };

  const handleDetailsClick = (index: number) => {
    setSelectedTurnIndex(index);
  };

  const getPokemonByTurn = (turno: number | string) => {
    return turnsList.find((pokemon: Pokemon) => pokemon.turn === turno);
  };

  const selectedPokemon = selectedTurnIndex !== null ? getPokemonByTurn(selectedTurnIndex) : null;

  const removeFirstPokemon = () => {
    setTurnsList(prevTurnsList => {
      const updatedTurnsList = prevTurnsList.slice(1).map((turn, index) => ({
        ...turn,
        turn: index + 1
      }));
      return updatedTurnsList;
    });
  };

  return (
    <>
    <div className="button-container">
      <button 
        className="btn btn-primary btn-md justify-content-center rounded-pill"
        type="button"
        onClick={() => removeFirstPokemon()}
      >
        Atender siguiente turno
      </button>
    </div>
    <div className="grid-container-nurse">
      <div className="d-flex justify-content-center item-pokemon mt-3" ref={cardRef}>
        {selectedPokemon && (
          <PokemonCard pokemon={selectedPokemon}/>
        )}
      </div>
      <div className="table-turnos mt-3">
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
                <th scope="col"></th>
              </tr>
            </thead>
            <Droppable droppableId="tasks">
              {(droppableProvider) => (
                <tbody
                  {...droppableProvider.droppableProps}
                  ref={droppableProvider.innerRef}
                >
                  {turnsList.map((pokemon, index) => (
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
                        >
                          <td>{pokemon.turn}</td>
                          <td>{pokemon.name}</td>
                          <td>{pokemon.level}</td>
                          <td>{pokemon.lifePoints}</td>
                          <td>{pokemon.status.map((s: Status) => s.name).join(', ')}</td>
                          <td>{pokemon.trainer}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm rounded-pill"
                              type="button"
                              onClick={() => handleDetailsClick(pokemon.turn)}
                            >
                              Detalles
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvider.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
    </>
  );
};

export default TableRow;
