const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

if (!baseUrl) {
  throw new Error('No BASEURL found');
}

const routes = {
    nurse: baseUrl + '/nurse',
    trainer: {
        types: baseUrl + '/trainer/types',
        status: baseUrl + '/trainer/status',
        turns: baseUrl + '/trainer/turns',
        pokemons: baseUrl + '/trainer/pokemons',
        create: baseUrl + '/trainer/pokemon',
        signup: baseUrl + '/trainer/signup',
        login: baseUrl + '/trainer/login',

    }
}

export { baseUrl, routes };
