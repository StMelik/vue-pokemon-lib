import axios from 'axios'

export const fetchPokemons = (page = 1, limit = 20) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit * (page - 1)}`)
}

export const fetchPokemon = (name) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
}