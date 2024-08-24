import { Pokemon } from "src/types";

/**
 * This function is crucial for determining the priority of Pokémon based on their status effects,
 * life points, and level. The calculated priority is then used to sort the Pokémon in the order
 * they should take their turns.
 *
 * @param pokemon An object representing a Pokémon, containing its status effects, life points, and level.
 * @returns A number representing the calculated priority of the Pokémon, where higher values indicate
 * higher priority.
 */

const statusPriority: Record<string, number> = {
    // higher values are assigned to statuses that affect the Pokemon's HP
    "PSN": 4,
    "BRN": 3,
    // other statuses only affect its performance in battles
    "FRZ": 1.5,
    "PAR": 1,
    "SLP": 0.5,
};

const calculatePriority = (pokemon: Pokemon): number => {
    let priority = 0;

    const lifePoints = pokemon.lifePoints / 255;
    priority += (1 - lifePoints) * 65;

    const totalStatus = pokemon.status.reduce((sum, status) => sum + statusPriority[status.name], 0);
    priority += totalStatus * 3;

    const level = 1 - (pokemon.level / 100);
    priority += level * 5;

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
