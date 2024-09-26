import { TrainerModel } from '../models/trainer.js';
import { PokemonModel } from '../models/pokemon.js';
import { validatePartialPokemon } from '../schemas/pokemon.js';

export class TrainerController {
    static async getAllStatus (req, res) {
        try {
            const status = await TrainerModel.getAllStatus()
            if (status) res.json(status)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getAllTypes (req, res) {
        try {
            const types = await TrainerModel.getAllTypes()
            if (types) res.json(types)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getPokemonsById (req, res) {
        try {
            const { id } = req.params;
            const pokemons = await TrainerModel.getPokemonsById({ id });
            if (pokemons) return res.json(pokemons);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async create (req, res) {
        try {
            const result = validatePartialPokemon(req.body)
            if (!result.success) {
                console.log(result.error);
                return res.status(400).json({ message: 'Validation failed' })
            }
            const newPokemon = await PokemonModel.create(req.body)
            res.status(201).json(newPokemon)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
