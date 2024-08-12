import NavBar from "@components/navbar";
import RegisterPokemon from "@components/register-pokemon";
import VisualizePokemon from "@components/visualize-pokemon";
import TableTurn from "@elements/table-turn";
import "@styles/styles.scss";
import pokemones from "@mocks/pokemones";

const Trainer: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="grid-container-trainer">
        <div className="item1">
          <h2 className="text-center">Turno actual</h2>
          <TableTurn pokemones={pokemones} />
          <h2 className="text-center">Registra tu Pokémon</h2>
          <RegisterPokemon />
        </div>
        <div className="item2">
          <h2 className="text-center">Mis Pokémones</h2>
          <VisualizePokemon pokemones={pokemones}/>
        </div>
      </div>
    </>
  );
};

export default Trainer;