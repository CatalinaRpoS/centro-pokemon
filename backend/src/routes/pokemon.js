import { Router } from 'express'

import { PokemonController } from '../controllers/pokemon.js'

export const pokemonnRouter = Router()

pokemonnRouter.get('/', PokemonController.getAll)
pokemonnRouter.post('/', PokemonController.create)

pokemonnRouter.get('/:id',  PokemonController.getById)
pokemonnRouter.delete('/:id', PokemonController.delete)
pokemonnRouter.patch('/:id',  PokemonController.update)