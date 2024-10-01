import { Router } from "express";
import { TrainerController } from "../controllers/trainer.js";
import { PokemonController } from "../controllers/pokemon.js";

export const trainerRouter = Router();

trainerRouter.get("/form-info", TrainerController.getAllStatusTypes);
trainerRouter.get("/turns", PokemonController.getAll);
trainerRouter.get("/pokemons/:id", TrainerController.getPokemonsById);
trainerRouter.post("/pokemon", PokemonController.create);
trainerRouter.post("/signup",TrainerController.signup);
trainerRouter.post("/login", TrainerController.login);
