import React from "react";
import { PokemonCard } from "@elements/pokemon-card";
import { pikachu, mewtwo, swadloon, leafeon } from "@assets/pokemon";
import { status1, status2 } from "@assets/status";
import { type1, type6, type7, type12, type13, type14 } from "@assets/types";

const VisualizePokemon: React.FC = () => {
  const Pokemon1Status = [status2, status1];
  const Pokemon2Status = [status1];
  const Pokemon3Status = [status2];
  const Pokemon4Status = [status2, status1];

  const Pokemon1Type = [type14];
  const Pokemon2Type = [type1];
  const Pokemon3Type = [type6, type12];
  const Pokemon4Type = [type7, type13];

  return (
    <div className="grid-container-cards">
      <PokemonCard
        image={swadloon}
        name={"Swadloon"}
        level={18}
        turn={7}
        lifePoints={27}
        status={Pokemon1Status}
        type={Pokemon1Type}
      />
      <PokemonCard
        image={leafeon}
        name={"Leafeon"}
        level={50}
        turn={13}
        lifePoints={53}
        status={Pokemon2Status}
        type={Pokemon2Type}
      />
      <PokemonCard
        image={pikachu}
        name={"Pikachu"}
        level={22}
        turn={22}
        lifePoints={59}
        status={Pokemon3Status}
        type={Pokemon3Type}
      />
      <PokemonCard
        image={mewtwo}
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

export default VisualizePokemon;