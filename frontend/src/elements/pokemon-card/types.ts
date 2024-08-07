export interface PokemonCardProps {
    image: string;
    name: string;
    level: number;
    turn: number;
    lifePoints: number;
    status: Array<string>;
    type: Array<string>;
}
