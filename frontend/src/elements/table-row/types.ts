import { Pokemon } from "src/types";

export interface TableRowProps{
    pokemones: Array<Pokemon>;
}

export interface IDragResult {
    source: { index: number };
    destination: { index: number } | null;
}
