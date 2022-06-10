import { createStore } from 'vuex'
import { fetchPokemons, fetchPokemon } from '../utils/fetchPokemons'

export default createStore({
  state: {
    isLoadingList: true,
    isLoadingPokemon: true,
    isLoadingNameList: true,
    totalPokemons: 0,
    pokemonsNameList: [],
    pokemonNameFilterList: [],
    pokemonsList: [],
    searchQuery: '',
    // pokemonFilterList: [],
    pokemon: {},
    limitSearchList: 5,
    limit: 10,
    page: 1,
  },
  getters: {
  },
  mutations: {
    setTotalPokemons(state, payload) {
      state.totalPokemons = payload
    },

    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },

    setPokemonNameList(state, payload) {
      state.pokemonsNameList = payload.map(i => i.name)
      // .map(i => {
      //   if (i.name.includes('-')) {
      //     const nameStr = i.name[0].toUpperCase() + i.name.slice(1)
      //     return nameStr.split('-').join(' ')
      //   }
      //   return i.name[0].toUpperCase() + i.name.slice(1)
      // })
    },

    setPokemonsList(state, payload) {
      state.pokemonsList.push(payload)
    },

    // setPokemonFilterList(state, payload) {
    //   state.pokemonFilterList.push(payload)
    // },

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

    setIsLoadingNameList(state, payload) {
      state.isLoadingNameList = payload
    },

    setPokemonNameFilterList(state, payload) {
      state.pokemonNameFilterList = payload
    },
  },
  actions: {
    async loadPokemons({ state, commit, dispatch }, page) {
      try {

        if (state.searchQuery) {
          commit('clearPokemonsList')
          state.pokemonNameFilterList
            .slice((page - 1) * state.limit, page * state.limit)
            .forEach(name => {
              dispatch('loadPokemon', { name, type: 'multi' })
            })
          return
        }

        const resolve = await fetchPokemons(page, state.limit)

        commit('setTotalPokemons', resolve.data.count)

        commit('clearPokemonsList')
        resolve.data.results
          .map(i => i.name)
          .forEach(name => {
            dispatch('loadPokemon', { name, type: 'multi' })
          });

        // commit('setIsLoading', false)

        // dispatch('loadPokemonNameList')

      } catch (err) {
        console.log(err);
      }
    },

    async loadPokemon({ commit }, { name, type }) {
      try {
        const resolve = await fetchPokemon(name)
        switch (type) {
          case 'one':
            commit('setPokemon', resolve.data)
            commit('setIsLoadingPokemon', false)
            break;

          case 'multi':
            commit('setPokemonsList', resolve.data)
            commit('setIsLoadingList', false)
            break;

          case 'filter':
            // commit('setPokemonFilterList', resolve.data)
            // commit('clearPokemonsList')
            commit('setPokemonsList', resolve.data)
            commit('setIsLoadingList', false)
            break;
        }

        // commit('setIsLoading', false)
      } catch (err) {
        console.log(err);
      }
    },

    async loadPokemonNameList({ state, commit }) {
      try {
        if (!state.pokemonsNameList.length) {
          const resolve = await fetchPokemons(1, state.totalPokemons)
          commit('setPokemonNameList', resolve.data.results)
          commit('setIsLoadingNameList', false)
        }

      } catch (err) {
        console.log(err);
      }
    }
  },
  modules: {
  }
})
