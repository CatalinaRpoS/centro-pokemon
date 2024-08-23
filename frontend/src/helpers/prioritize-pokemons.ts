import { Pokemon } from "src/types";

const statusPriority: Record<string, number> = {
    "FRZ": 5,
    "PAR": 4,
    "SLP": 3,
    "PSN": 2,
    "BRN": 1
};

const calculatePriority = (pokemon: Pokemon): number => {
    let priority = 0;

    const maxStatus = Math.max(...pokemon.status.map(status => statusPriority[status.name]));
    priority += maxStatus * 100;

    const lifePoints = pokemon.lifePoints / 255;
    priority += (1 - lifePoints) * 50;

    const level = 1 - (pokemon.level / 100);
    priority += level * 10;

    return priority;
};

const prioritizePokemons = (pokemons: Pokemon[]): Pokemon[] => {
    const sortedPokemons = pokemons.sort((a, b) => calculatePriority(b) - calculatePriority(a));

    sortedPokemons.forEach((pokemon, index) => {
        pokemon.turn = index + 1;
    });

    return sortedPokemons;
};

export default prioritizePokemons;
