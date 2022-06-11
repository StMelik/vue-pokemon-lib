import Api from '@/utils/Api'
import configApi from '@/utils/configApi'

const api = new Api(configApi)

export default {
    namespaced: true,

    state: {
        limitSearchList: 5, // Сколько результатов отображать в списке поиска
        searchQuery: '', // Значение поисковой строки
        isShowSearchList: false,
        isNotFound: false,
        pokemonsNameList: [], // Все существующие имена
    },

    getters: {
        getPokemonNameFilterList(state) {
            return state.pokemonsNameList.filter(name => name.toLowerCase().startsWith(state.searchQuery.toLowerCase()))
        },

        getSeachList(state, getters) {
            return getters.getPokemonNameFilterList.slice(0, state.limitSearchList)
        }
    },

    mutations: {
        setSearchQuery(state, payload) {
            state.searchQuery = payload
        },

        setPokemonNameList(state, payload) {
            state.pokemonsNameList = payload.map(i => i.name)
        },

        setPokemonNameFilterList(state, payload) {
            state.pokemonNameFilterList = payload
        },

        setIsShowSearchList(state, payload) {
            state.isShowSearchList = payload
        },

        setIsNotFound(state, payload) {
            state.isNotFound = payload
        }
    },

    actions: {
        async loadPokemonNameList({ state, commit, rootState }) {
            const isEmptyPokemonsNameList = !state.pokemonsNameList.length
            try {
                if (isEmptyPokemonsNameList) {
                    const resolve = await api.fetchPokemons(1, rootState.pagination.totalPokemons)
                    commit('setPokemonNameList', resolve.data.results)
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
}
