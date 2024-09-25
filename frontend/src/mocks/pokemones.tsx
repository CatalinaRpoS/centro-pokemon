import { Pokemon } from '../types';

const pokemones: Array<Pokemon> = [
  {
    id: 1,
    name:'Swadloon',
    level:18,
    trainer_fullname: 'Clemont Doe',
    turn:1,
    life_points:27,
    first_type: {
      name: 'Grass',
      image: 'type14'
    },
    second_type: {
      name: 'Fighting',
      image: 'type2'
    },
    pokemon_status: [{
      name: 'PAR',
      image: 'status1'
    }, {
      name: 'BRN',
      image: 'status2'
    }]
  },
  {
    id: 2,
    name:'Leafeon',
    level:50,
    trainer_fullname: 'Gary Oak',
    turn:2,
    life_points:53,
    first_type: {
      name: 'Normal',
      image: 'type1'
    },
    second_type: {
      name: 'Fighting',
      image: 'type2'
    },
    pokemon_status: [{
      name: 'FRZ',
      image: 'status3'
    }]
  },
  {
    id: 3,
    name:'Pikachu',
    level:22,
    trainer_fullname: 'Ash Ketchum',
    turn:3,
    life_points:59,
    first_type: {
      name: 'Electric',
      image: 'type6'
    },
    second_type: {
      name: 'Fighting',
      image: 'type2'
    },
    pokemon_status: [{
      name: 'PSN',
      image: 'status4'
    }, {
      name: 'SLP',
      image: 'status5'
    }, {
      name: 'PAR',
      image: 'status1'
    }]
  },
  {
    id: 4,
    name:'Mewtwo',
    level:33,
    trainer_fullname: 'Gary Oak',
    turn:4,
    life_points:71,
    first_type: {
      name: 'Bug',
      image: 'type18'
    },
    second_type: {
      name: 'Fighting',
      image: 'type2'
    },
    pokemon_status: [{
      name: 'FRZ',
      image: 'status3'
    }, {
      name: 'BRN',
      image: 'status2'
    }]
  },
  {
    id: 5,
    name:'Swadloon',
    level:22,
    trainer_fullname: 'Ash Ketchum',
    turn:5,
    life_points:13,
    first_type: {
      name: 'Ground',
      image: 'type15'
    },
    second_type: {
      name: 'Fighting',
      image: 'type2'
    },
    pokemon_status: [{
      name: 'PAR',
      image:'status1'
    }, {
      name: 'BRN',
      image: 'status2'
    }]
  },
];

export default pokemones;