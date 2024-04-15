import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { turns } from "../data/turns";

interface Turn {
  turno: number;
  name: string;
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Turno</th>
            <th scope="col">Pokémon</th>
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
                      <td>{turn.pv}</td>
                      <td>{turn.status}</td>
                      <td>{turn.trainer}</td>
                      <td></td>
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
  );
};
