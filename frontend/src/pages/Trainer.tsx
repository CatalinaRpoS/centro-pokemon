import { NavBar } from "../components/NavBar";
import { RegisterPokemon } from "../components/RegisterPokemon";
import { TableTurns } from "../elements/TableTurns";
import { VisualizePokemons } from "../components/VisualizePokemons";
import "../styles/styles.scss";

export const Trainer = () => {
  return (
    <>
      <NavBar />
      <div className="navbar-blue"></div>
      <div className="grid-container-trainer">
        <div className="first-div">
          <h2 className="text-center">Turno Actual</h2>
          <TableTurns />
        </div>
        <div className="second-div">
          <h2 className="text-center">Mis Pokémones</h2>
          <VisualizePokemons />
        </div>
        <div className="three-div">
          <h2 className="text-center">Registra tu Pokémon</h2>
          <RegisterPokemon />
        </div>
      </div>
    </>
  );
};
