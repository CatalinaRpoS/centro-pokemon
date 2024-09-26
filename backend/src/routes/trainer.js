import { Router } from 'express';
import { TrainerController } from '../controllers/trainer.js';
import { PokemonController } from '../controllers/pokemon.js';

export const trainerRouter = Router();

trainerRouter.get('/status', TrainerController.getAllStatus);
trainerRouter.get('/types', TrainerController.getAllTypes);
trainerRouter.get('/turns', PokemonController.getAll);
trainerRouter.get('/pokemons/:id', TrainerController.getPokemonsById);
trainerRouter.post('/pokemon', TrainerController.create);
