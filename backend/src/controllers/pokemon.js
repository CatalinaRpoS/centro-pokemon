import { PokemonModel } from '../models/pokemon.js'
import { validatePokemon, validatePartialPokemon } from '../schemas/pokemon.js'

export class PokemonController {
  static async getAll (req, res) {
    try {
        const pokemones = await PokemonModel.getAll()
        console.log(pokemones)
        res.json(pokemones)
    } catch (error) {
        res.status(500).json({ message: "rayos" })
    }
  }

  static async getAllTrainer (req, res) {
    try {
        const { id_entrenador } = req.query
        const pokemones = await PokemonModel.getAll({ id_entrenador })
        res.json(pokemones)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    try {
        const { id } = req.params
        const pokemon = await PokemonModel.getById({ id })
        if (pokemon) return res.json(pokemon)
        res.status(404).json({ message: 'Pokemon not found' })
    } catch (error){
        res.status(500).json({ message: error.message })
    }
  }

  static async create (req, res) {
    try {
        const result = validatePokemon(req.body)
        if (!result.success) {
            return res.status(400).json({ message: 'Validation failed' })
        }
        const newPokemon = await PokemonModel.create(req.body)
        res.status(201).json(newPokemon)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {
    try {
        const { id } = req.params
        const result = await PokemonModel.delete({ id })
        if (result === false) {
            return res.status(404).json({ message: 'Pokemon not found' })
        }
        return res.json({ message: 'Pokemon deleted' })
    } catch {
        return res.status(500).json({ message: error.message })
    }
  }

  static async update (req, res) {
    const result = validatePartialPokemon(req.body)
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed' })
    }
    try {
        const { id } = req.params
        const updatedPokemon = await PokemonModel.update({ id, input: result.data })
        return res.json(updatedPokemon)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
  }
}