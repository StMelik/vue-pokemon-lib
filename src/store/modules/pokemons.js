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

    mutations: {
        setPokemonsList(state, payload) {
            state.pokemonsList.push({
                ...payload,
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
        async loadPokemons({ commit, dispatch, rootState, rootGetters }, page) {
            const hasSearchQuery = rootState.search.searchQuery
            const limit = rootState.pagination.limit

            commit('clearPokemonsList')

            try {
                const resolvePokemonsName = await api.fetchPokemons(page, limit)

                commit('pagination/setTotalPokemons', resolvePokemonsName.data.count, { root: true })

                if (hasSearchQuery) {
                    const resolve = await api.fetchPokemons(1, rootState.pagination.totalPokemons)

                    commit('search/setPokemonNameList', resolve.data.results, { root: true })

                    const pokemonNameFilterList = rootGetters['search/getPokemonNameFilterList']

                    if (pokemonNameFilterList.length) {
                        commit('search/setIsNotFound', true, { root: true })
                    } else {
                        commit('search/setIsNotFound', false, { root: true })
                    }

                    commit('pagination/setTotalPokemons', pokemonNameFilterList.length, { root: true })

                    pokemonNameFilterList
                        .slice((page - 1) * limit, page * limit)
                        .forEach(name => {
                            dispatch('loadPokemon', { name, type: 'multi' })
                        })
                } else {
                    resolvePokemonsName.data.results
                        .map(i => i.name)
                        .forEach(name => {
                            dispatch('loadPokemon', { name, type: 'multi' })
                        });
                }
            } catch (err) {
                console.log(err);
            }
        },

        async loadPokemon({ commit }, { name, type }) {
            try {
                const resolvePokemon = await api.fetchPokemon(name)

                switch (type) {
                    case 'one':
                        commit('setPokemon', resolvePokemon.data)
                        commit('loader/setIsLoadingPokemon', false, { root: true })
                        break;

                    case 'multi':
                        commit('setPokemonsList', resolvePokemon.data)
                        commit('loader/setIsLoadingList', false, { root: true })
                        break;
                }
            } catch (err) {
                console.log(err);
            }
        },
    }
}
