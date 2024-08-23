import NavBar from "@components/navbar";
import { TableRow } from "@elements/table-row";
import prioritizePokemons from "@helpers/prioritize-pokemons";
import pokemones from "@mocks/pokemones";

const NursePage: React.FC = () => {
  const sortedPokemons = prioritizePokemons(pokemones);

  return (
    <>
      <NavBar />
      <TableRow pokemones={sortedPokemons} />
    </>
  );
};

export default NursePage;