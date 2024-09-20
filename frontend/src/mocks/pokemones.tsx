import { 
    type1, type2, type6, type14, type15, type18 
} from "@assets/types";
import { Pokemon } from "../types";

const pokemones: Array<Pokemon> = [
  {
    id: 1,
    name:"Swadloon",
    level:18,
    trainer_email: "Clemont Doe",
    turn:1,
    life_points:27,
    first_type: type14,
    second_type: type2
  },
  {
    id: 2,
    name:"Leafeon",
    level:50,
    trainer_email: "Gary Oak",
    turn:2,
    life_points:53,
    first_type: type1,
    second_type: type2
  },
  {
    id: 3,
    name:"Pikachu",
    level:22,
    trainer_email: "Ash Ketchum",
    turn:3,
    life_points:59,
    first_type: type6,
    second_type: type2
  },
  {
    id: 4,
    name:"Mewtwo",
    level:33,
    trainer_email: "Gary Oak",
    turn:4,
    life_points:71,
    first_type: type18,
    second_type: type2
  },
  {
    id: 5,
    name:"Swadloon",
    level:22,
    trainer_email: "Ash Ketchum",
    turn:5,
    life_points:13,
    first_type: type15,
    second_type: type2
  },
];

export default pokemones;