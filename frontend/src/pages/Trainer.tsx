import { RegisterPokemon } from "../components/RegisterPokemon";
import { NavBar } from "../components/NavBar";
import "../styles/styles.scss";
import { TableTurns } from "../elements/tableTurns";

export const Trainer = () => {
  return (
    <>
      <NavBar />
      <div className="navbar-blue"></div>
      <div className="grid-container-trainer">
        <div className="first-div">
          <h2>Turno Actual</h2>
          <TableTurns />
        </div>
        <div className="second-div">
          <h2>Mis Pokémones</h2>
        </div>
        <div className="three-div">
          <h2>Registra tu Pokémon</h2>
          <RegisterPokemon />
        </div>
      </div>
    </>
  );
};
