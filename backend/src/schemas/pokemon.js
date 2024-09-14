import z from 'zod'

const pokemonSchema = z.object({
  name: z.string({
    invalid_type_error: 'Pokemon name must be a string',
    required_error: 'Pokemon name is required.'
  }),
  type: z.array(
    z.enum(['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy']),
    {
      invalid_type_error: 'Pokemon type must be an array of predefined types',
      required_error: 'Pokemon type is required.'
    }
  ).max(2, 'Pokemon can have a maximum of 2 types'),
  level: z.number().int().min(0).max(100, {
    invalid_type_error: 'Pokemon level must be an integer between 0 and 100',
    required_error: 'Pokemon level is required.'
  }),
  id_entrenador: z.number().int().positive({
    invalid_type_error: 'Trainer ID must be a positive integer',
    required_error: 'Trainer ID is required.'
  }),
  turn: z.number().int().positive({
    invalid_type_error: 'Turn must be a positive integer',
    required_error: 'Turn is required.'
  }),
  lifePoints: z.number().int().min(0).max(255, {
    invalid_type_error: 'Life Points must be a non-negative integer',
    required_error: 'Life Points are required.'
  }),
  status: z.array(
    z.enum(['PRN', 'BRN', 'PSN', 'SLP', 'FRZ']),
    {
      invalid_type_error: 'Status must be an array of predefined statuses',
      required_error: 'Status is required.'
    }
  )
})

export function validatePokemon (input) {
  return pokemonSchema.safeParse(input)
}

export function validatePartialPokemon (input) {
  return pokemonSchema.partial().safeParse(input)
}