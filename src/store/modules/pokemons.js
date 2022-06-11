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
        // async loadSearchPokemons() {

        //     // очистить список карточек
        //     commit('clearPokemonsList')

        //     commit('pagination/setTotalPokemons', rootGetters['search/getPokemonNameFilterList'].length, { root: true })

        //     // получить отфильтрованные имена
        //     rootGetters['search/getPokemonNameFilterList']
        //         .slice((page - 1) * rootState.pagination.limit, page * rootState.pagination.limit)
        //         .forEach(name => {
        //             dispatch('loadPokemon', { name, type: 'multi' })
        //         })
        // },


        async loadPokemons({ commit, dispatch, rootState, rootGetters }, page) {
            const hasSearchQuery = rootState.search.searchQuery
            const limit = rootState.pagination.limit
            const pokemonNameFilterList = rootGetters['search/getPokemonNameFilterList']

            commit('clearPokemonsList')

            if (hasSearchQuery) {
                commit('pagination/setTotalPokemons', pokemonNameFilterList.length, { root: true })

                pokemonNameFilterList
                    .slice((page - 1) * limit, page * limit)
                    .forEach(name => {
                        dispatch('loadPokemon', { name, type: 'multi' })
                    })
                return
            }

            try {
                const resolvePokemonsName = await api.fetchPokemons(page, limit)

                commit('pagination/setTotalPokemons', resolvePokemonsName.data.count, { root: true })

                resolvePokemonsName.data.results
                    .map(i => i.name)
                    .forEach(name => {
                        dispatch('loadPokemon', { name, type: 'multi' })
                    });

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
