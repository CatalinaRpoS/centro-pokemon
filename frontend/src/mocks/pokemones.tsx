import { pikachu, mewtwo, swadloon, leafeon } from "@assets/pokemon";
import { 
    type1, type2, type3, type4, type5, type6, type7, type8, 
    type9, type10, type11, type12, type13, type14, type15, type16, 
    type17, type18 
} from "@assets/types";
import { Pokemon } from "../types";
import status from "./status";

const pokemones: Array<Pokemon> = [
  {
    image: swadloon,
    name:"Swadloon",
    level:18,
    trainer: "Clemont Doe",
    turn:1,
    lifePoints:27,
    status: [status[0]],
    type:[type14, type2, type3, type18, type15]
  },
  {
    image:leafeon,
    name:"Leafeon",
    level:50,
    trainer: "Gary Oak",
    turn:2,
    lifePoints:53,
    status:[status[4], status[2]],
    type:[type1, type2, type13, type14, type15, type16, 
      type17, type18]
  },
  {
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
    image:mewtwo,
    name:"Mewtwo",
    level:33,
    trainer: "Gary Oak",
    turn:4,
    lifePoints:71,
    status:[status[0], status[1], status[2], status[3], status[4]],
    type:[type1, type2, type3, type4, type5, type6, type7, type8, 
      type9, type10, type11, type12, type13, type14, type15, type16, 
      type17, type18]
  },
  {
    image: swadloon,
    name:"Swadloon",
    level:22,
    trainer: "Ash Ketchum",
    turn:5,
    lifePoints:13,
    status: [status[0], status[1], status[3], status[4]],
    type:[type14, type2, type3, type18, type15]
  },
];

export default pokemones;