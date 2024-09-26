import { Status } from 'src/types';

export type PokemonType = {
    trainer_email: string;
    name: string;
    life_points: number;
    level: number;
    first_type: string;
    second_type: string | null;
    pokemon_status: Status[];
};