import { PokemonCard } from "../elements/PokemonCard";
import Pokemon1 from "../assets/541.png";
import Pokemon2 from "../assets/470.png";
import Pokemon3 from "../assets/0025.png";
import Pokemon4 from "../assets/0150.png";
import Status1 from "../assets/status1.png";
import Status2 from "../assets/status2.png";
import Type1 from "../assets/Type1.png";
import Type6 from "../assets/Type6.png";
import Type7 from "../assets/Type7.png";
import Type12 from "../assets/Type12.png";
import Type13 from "../assets/Type13.png";
import Type14 from "../assets/Type14.png";

export const VisualizePokemons = () => {
  const Pokemon1Status = [Status2, Status1];
  const Pokemon2Status = [Status1];
  const Pokemon3Status = [Status2];
  const Pokemon4Status = [Status2, Status1];

  const Pokemon1Type = [Type14];
  const Pokemon2Type = [Type1];
  const Pokemon3Type = [Type6, Type12];
  const Pokemon4Type = [Type7, Type13];

  return (
    <div className="grid-container-cards">
      <PokemonCard
        image={Pokemon1}
        name={"Swadloon"}
        level={18}
        turn={7}
        lifePoints={27}
        status={Pokemon1Status}
        type={Pokemon1Type}
      />
      <PokemonCard
        image={Pokemon2}
        name={"Leafeon"}
        level={50}
        turn={13}
        lifePoints={53}
        status={Pokemon2Status}
        type={Pokemon2Type}
      />
      <PokemonCard
        image={Pokemon3}
        name={"Pikachu"}
        level={22}
        turn={22}
        lifePoints={59}
        status={Pokemon3Status}
        type={Pokemon3Type}
      />
      <PokemonCard
        image={Pokemon4}
        name={"Mewtwo"}
        level={33}
        turn={29}
        lifePoints={71}
        status={Pokemon4Status}
        type={Pokemon4Type}
      />
    </div>
  );
};
