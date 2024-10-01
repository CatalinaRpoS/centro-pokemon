const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

if (!baseUrl) {
  throw new Error('No BASEURL found');
}

const routes = {
    nurse: baseUrl + 'nurse',
    trainer: {
        formInfo: baseUrl + 'trainer/form-info',
        turns: baseUrl + 'trainer/turns',
        pokemons: baseUrl + 'trainer/pokemons',
        create: baseUrl + 'trainer/pokemon',
        signup: baseUrl + 'trainer/signup',
    },
    login: baseUrl + 'login'
}

export { baseUrl, routes };
