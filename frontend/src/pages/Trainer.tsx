import { NavBar } from "../components/NavBar";
import { RegisterPokemon } from "../components/RegisterPokemon";
import { VisualizePokemons } from "../components/VisualizePokemons";
import { TableTurns } from "../elements/tableTurns";
import "../styles/styles.scss";

export const Trainer = () => {
  return (
    <>
      <NavBar />
      <div className="navbar-blue"></div>
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turno Actual</h2>
          <TableTurns />
        </div>
        <div className="item2">
          <h2 className="text-center">Mis Pokémones</h2>
          <VisualizePokemons />
        </div>
        <div className="item3">
          <h2 className="text-center">Registra tu Pokémon</h2>
          <RegisterPokemon />
        </div>
      </div>
    </>
  );
};
