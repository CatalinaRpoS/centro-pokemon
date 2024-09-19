import { pikachu, mewtwo, swadloon, leafeon } from "@assets/pokemon";
import { 
    type1, type2, type6, type14, type15, type18 
} from "@assets/types";
import { Pokemon } from "../types";
import status from "./status";

const pokemones: Array<Pokemon> = [
  {
    id: 1,
    image: swadloon,
    name:"Swadloon",
    level:18,
    trainer: "Clemont Doe",
    turn:1,
    lifePoints:27,
    status: [status[0]],
    type:[type14, type2]
  },
  {
    id: 2,
    image:leafeon,
    name:"Leafeon",
    level:50,
    trainer: "Gary Oak",
    turn:2,
    lifePoints:53,
    status:[status[4], status[2]],
    type:[type1]
  },
  {
    id: 3,
    image:pikachu,
    name:"Pikachu",
    level:22,
    trainer: "Ash Ketchum",
    turn:3,
    lifePoints:59,
    status:[status[2], status[3], status[1]],
    type:[type6]
  },
  {
    id: 4,
    image:mewtwo,
    name:"Mewtwo",
    level:33,
    trainer: "Gary Oak",
    turn:4,
    lifePoints:71,
    status:[status[0], status[1], status[2], status[3], status[4]],
    type:[type18]
  },
  {
    id: 5,
    image: swadloon,
    name:"Swadloon",
    level:22,
    trainer: "Ash Ketchum",
    turn:5,
    lifePoints:13,
    status: [status[0], status[1], status[3], status[4]],
    type:[type14, type15]
  },
];

export default pokemones;