import { Status, Type } from 'src/types';

export interface RegisterPokemonProps{
    pokemonTypes: Type[];
    pokemonStatus: Status[];
    currentTurn: number;
    onRegister: (pokemon: {
        trainer_email: string;
        name: string;
        life_points: number;
        level: number;
        first_type: string;
        second_type: string | null;
        pokemon_status: Status[];
    }) => void;
}

export type ErrorType = {
    type?: string;
    status?: string;
    pokemon?: string;
}
