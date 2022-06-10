import { createStore } from 'vuex'
import { fetchPokemons, fetchPokemon } from '../utils/fetchPokemons'

export default createStore({
  state: {
    isLoadingList: true,
    isLoadingPokemon: true,
    totalPokemons: 0,
    pokemonsNameList: [],
    pokemonsList: [],
    pokemon: {},
    limit: 10,
    page: 1,
  },
  getters: {
  },
  mutations: {
    setTotalPokemons(state, payload) {
      state.totalPokemons = payload
    },

    setPokemonNameList(state, payload) {
      state.pokemonsNameList = payload.map(i => {
        if (i.name.includes('-')) {
          const nameStr = i.name[0].toUpperCase() + i.name.slice(1)
          return nameStr.split('-').join(' ')
        }
        return i.name[0].toUpperCase() + i.name.slice(1)
      })
    },

    setPokemonsList(state, payload) {
      state.pokemonsList.push(payload)
    },

    clearPokemonsList(state) {
      state.pokemonsList = []
    },

    setPage(state, payload) {
      state.page = payload
    },

    setPokemon(state, payload) {
      state.pokemon = payload
    },

    setIsLoadingList(state, payload) {
      state.isLoadingList = payload
    },

    setIsLoadingPokemon(state, payload) {
      state.isLoadingPokemon = payload
    },
  },
  actions: {
    async loadPokemons({ state, commit, dispatch }, page) {
      try {
        const resolve = await fetchPokemons(page, state.limit)

        commit('setTotalPokemons', resolve.data.count)

        commit('clearPokemonsList')
        resolve.data.results
          .map(i => i.name)
          .forEach(name => {
            dispatch('loadPokemon', { name, isOne: false })
          });

        // commit('setIsLoading', false)

        // dispatch('loadPokemonNameList')

      } catch (err) {
        console.log(err);
      }
    },

    async loadPokemon({ commit }, { name, isOne }) {
      try {
        const resolve = await fetchPokemon(name)
        if (isOne) {
          commit('setPokemon', resolve.data)
          commit('setIsLoadingPokemon', false)
        } else {
          commit('setPokemonsList', resolve.data)
          commit('setIsLoadingList', false)
        }

        // commit('setIsLoading', false)
      } catch (err) {
        console.log(err);
      }
    },

    async loadPokemonNameList({ state, commit }) {
      try {
        const resolve = await fetchPokemons(1, state.totalPokemons)
        commit('setPokemonNameList', resolve.data.results)
      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
