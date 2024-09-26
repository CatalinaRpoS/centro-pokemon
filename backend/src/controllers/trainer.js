import { TrainerModel } from "../models/trainer.js";

export class TrainerController {
  static async getAllStatus(req, res) {
    try {
      const status = await TrainerModel.getAllStatus();
      if (status) res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllTypes(req, res) {
    try {
      const types = await TrainerModel.getAllTypes();
      if (types) res.json(types);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPokemonsById(req, res) {
    try {
      const { id } = req.params;
      const pokemons = await TrainerModel.getPokemonsById({ id });
      if (pokemons) return res.json(pokemons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
