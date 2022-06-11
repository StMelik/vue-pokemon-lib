import axios from 'axios'

export default class Api {
    constructor(configApi) {
        this.configApi = configApi
    }

    fetchPokemons(page = 1, limit = 0) {
        return axios.get('pokemon', {
            ...this.configApi,
            params: {
                limit,
                offset: limit * (page - 1)
            }
        })
    }

    fetchPokemon(name) {
        return axios.get(`pokemon/${name}`, this.configApi)
    }
}