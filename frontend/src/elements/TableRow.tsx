import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { turns } from "../data/turns";
import { PokemonCard } from "./PokemonCard";
import Pokemon1 from "../assets/541.png";
import Status1 from "../assets/status1.png";
import Type1 from "../assets/Type1.png";

interface Turn {
  turno: number;
  name: string;
  level: number;
  pv: number;
  status: string;
  trainer: string;
}

interface IDragResult {
  source: { index: number };
  destination: { index: number } | null;
}

export const TableRow = () => {
  const [turnsList, setTurnsList] = useState<Turn[]>(turns);
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

    newTurnsList.forEach((turn, index) => {
      turn.turno = index + 1;
    });

    setTurnsList(newTurnsList);
  };

  const handleDetailsClick = (index: number) => {
    setSelectedTurnIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setSelectedTurnIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid-container-nurse">
      <div className="item-pokemon mt-3" ref={cardRef}>
        {selectedTurnIndex !== null && (
          <PokemonCard
            image={Pokemon1}
            name={turnsList[selectedTurnIndex].name}
            level={turnsList[selectedTurnIndex].level}
            turn={turnsList[selectedTurnIndex].turno}
            lifePoints={turnsList[selectedTurnIndex].pv}
            status={[Status1]}
            type={[Type1]}
          />
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
                  {turnsList.map((turn, index) => (
                    <Draggable
                      key={turn.turno}
                      draggableId={turn.turno.toString()}
                      index={index}
                    >
                      {(draggableProvider) => (
                        <tr
                          {...draggableProvider.draggableProps}
                          {...draggableProvider.dragHandleProps}
                          ref={draggableProvider.innerRef}
                          className="tasks-item"
                        >
                          <td>{turn.turno}</td>
                          <td>{turn.name}</td>
                          <td>{turn.level}</td>
                          <td>{turn.pv}</td>
                          <td>{turn.status}</td>
                          <td>{turn.trainer}</td>
                          <td>
                            <button
                              className="btn btn-primary m-3"
                              type="button"
                              onClick={() => handleDetailsClick(index)}
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
  );
};
