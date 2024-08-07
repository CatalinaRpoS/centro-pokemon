import React from "react";
import NavBar from "@components/navbar";
import { TableRow } from "@elements/table-row";

const Nurse: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="navbar-blue d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-danger m-3" type="button">
          Atender Pokémon
        </button>
        <button className="btn btn-danger m-3" type="button">
          Modificar Agenda
        </button>
      </div>
      <TableRow />
    </>
  );
};

export default Nurse;
