import { TrainerModel } from "../models/trainer.js";

export class TrainerController {
  static async getAllStatusTypes(req, res) {
    try {
      const { status, types } = await TrainerModel.getAllStatusTypes();
      if (status && types) return res.json({ status, types });
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

  static async signup(req, res) {
    try {
      const { email, password, name, last_name } = req.body;
      const user = await TrainerModel.signup({ email, password, name, last_name });
      if (user) return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await TrainerModel.login({ email, password });
      if (user) return res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
}
