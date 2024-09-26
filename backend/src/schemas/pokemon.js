import z from 'zod';

const allowedTypes = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 
  'Fairy', 'Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 
  'Ghost', 'Steel'];

const allowedStatus = [
  {name: 'BRN', image: 'status2', priority: 3},
  {name: 'FRZ', image: 'status3', priority: 1.5},
  {name: 'PAR', image: 'status1', priority: 1},
  {name: 'PSN', image: 'status4', priority: 4},
  {name: 'SLP', image: 'status5', priority: 0.5}
];

const allowedStatusNames = allowedStatus.map(status => status.name);

const pokemonSchema = z.object({
  name: z.string({
    invalid_type_error: 'Pokemon name must be a string',
    required_error: 'Pokemon name is required.'
  }),
  first_type: z.string({
      invalid_type_error: 'Pokemon type must be a string',
      required_error: 'Pokemon type is required.'
    }
  ).refine(type => allowedTypes.includes(type), {
    message: 'Invalid type in first_type',
  }),
  second_type: z.string(
    {
      invalid_type_error: 'Pokemon type must be a string',
    }
  ).refine(type => allowedTypes.includes(type), {
    message: 'Invalid type in second_type',
  }),
  level: z.number().int().min(0).max(100, {
    invalid_type_error: 'Pokemon level must be an integer between 0 and 100',
    required_error: 'Pokemon level is required.'
  }),
  trainer_email: z.string({
    invalid_type_error: 'Trainer email must be a string',
    required_error: 'Trainer email is required.'
  }),
  life_points: z.number().int().min(0).max(255, {
    invalid_type_error: 'Life Points must be a non-negative integer',
    required_error: 'Life Points are required.'
  }),
  pokemon_status: z.array(
    z.object({
      name: z.enum(allowedStatusNames, {
        invalid_type_error: 'Status name must be one of the predefined statuses',
      }),
      image: z.string({
        invalid_type_error: 'Status image must be a string',
      }),
      priority: z.number({
        invalid_type_error: 'Status priority must be a number',
      })
    })
  ).refine(statuses => statuses.every(status => allowedStatusNames.includes(status.name)), {
    message: 'Invalid status in status array',
  })
})

export function validatePokemon (input) {
  return pokemonSchema.safeParse(input)
}

export function validatePartialPokemon (input) {
  return pokemonSchema.partial().safeParse(input)
}
