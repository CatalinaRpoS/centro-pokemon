import NavBar from "@components/navbar";
import { TableRow } from "@elements/table-row";
import pokemones from "@mocks/pokemones";

const NursePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <TableRow pokemones={ pokemones } />
    </>
  );
};

export default NursePage;