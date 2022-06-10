import Api from '@/utils/Api'
import configApi from '@/utils/configApi'
import { formatName, formatPokemonType, formatPokemonAbilities, formatPokemonStats, formatPokemonImage } from '@/utils/formatPokemonInfo'

const api = new Api(configApi)

export default {
    namespaced: true,
    state: {
        pokemonsList: [], // отображаемый список
        pokemon: {}, // отображаемый покемон
    },
    // getters: {
    //     // getName(state) {
    //     //     const name = state.pokemon.name
    //     //     return name[0].toUpperCase() + name.slice(1)
    //     // }
    // },
    mutations: {
        setPokemonsList(state, payload) {
            state.pokemonsList.push({
                ...payload,
                name: formatName(payload.name),
                types: formatPokemonType(payload.types),
                stats: formatPokemonStats(payload.stats),
                image: formatPokemonImage(payload.sprites),
            })
        },

        clearPokemonsList(state) {
            state.pokemonsList = []
        },

        setPokemon(state, payload) {
            state.pokemon = {
                ...payload,
                name: formatName(payload.name),
                types: formatPokemonType(payload.types),
                weight: payload.weight / 10,
                height: payload.height / 10,
                abilities: formatPokemonAbilities(payload.abilities),
                stats: formatPokemonStats(payload.stats),
                image: formatPokemonImage(payload.sprites),
            }
        },
    },
    actions: {
        async loadPokemons({ commit, dispatch, rootState }, page) {
            try {

                if (rootState.search.searchQuery) {
                    commit('clearPokemonsList')
                    rootState.search.pokemonNameFilterList
                        .slice((page - 1) * rootState.pagination.limit, page * rootState.pagination.limit)
                        .forEach(name => {
                            dispatch('loadPokemon', { name, type: 'multi' })
                        })
                    return
                }

                const resolve = await api.fetchPokemons(page, rootState.pagination.limit)

                commit('pagination/setTotalPokemons', resolve.data.count, { root: true })

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
                const resolve = await api.fetchPokemon(name)
                switch (type) {
                    case 'one':
                        commit('setPokemon', resolve.data)
                        commit('loader/setIsLoadingPokemon', false, { root: true })
                        break;

                    case 'multi':
                        commit('setPokemonsList', resolve.data)
                        commit('loader/setIsLoadingList', false, { root: true })
                        break;

                    case 'filter':
                        // commit('setPokemonFilterList', resolve.data)
                        // commit('clearPokemonsList')
                        commit('setPokemonsList', resolve.data)
                        commit('loader/setIsLoadingList', false, { root: true })
                        break;
                }

                // commit('setIsLoading', false)
            } catch (err) {
                console.log(err);
            }
        },
    }
}
