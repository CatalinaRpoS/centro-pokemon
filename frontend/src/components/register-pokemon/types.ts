import { Pokemon, Status } from "src/types";

export interface RegisterPokemonProps{
    types: Array<string>;
    status: Array<Status>;
    currentTurn: number;
    onRegister: (pokemon: Pokemon) => void;
}
