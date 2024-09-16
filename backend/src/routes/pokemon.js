import { Router } from 'express';

import { PokemonController } from '../controllers/pokemon.js';

export const pokemonRouter = Router();

pokemonRouter.get('/', PokemonController.getAll);
pokemonRouter.post('/', PokemonController.create);

pokemonRouter.get('/:id',  PokemonController.getById);
pokemonRouter.delete('/:id', PokemonController.delete);
pokemonRouter.patch('/:id',  PokemonController.update);
