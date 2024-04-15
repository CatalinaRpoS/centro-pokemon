import { NavBar } from "../components/NavBar";
import { TableRow } from "../elements/TableRow";

export const Nurse = () => {
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
      <div className="grid-container-nurse">
        <div className="item-pokemon"></div>
        <div className="table-turnos">
          <TableRow />
        </div>
      </div>
    </>
  );
};
