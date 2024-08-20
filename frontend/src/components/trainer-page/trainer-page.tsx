import NavBar from "@components/navbar";
import RegisterPokemon from "@components/register-pokemon";
import VisualizePokemon from "@components/visualize-pokemon";
import TableTurn from "@elements/table-turn";
import "@styles/styles.scss";
import pokemones from "@mocks/pokemones";
import types from "@mocks/types";
import status from "@mocks/status";

const Trainer: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turnos</h2>
          <TableTurn pokemones={pokemones} />
        </div>

        <div className="grid-container-form">
          <div className="item2">
            <h2 className="text-center">Registra tu Pokémon</h2>
            <RegisterPokemon types={types} status={status} />
          </div>

          <div className="item3">
            <h2 className="text-center">Mis Pokémones</h2>
            <VisualizePokemon pokemones={pokemones} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainer;
