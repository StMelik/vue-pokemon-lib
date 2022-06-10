import Api from '@/utils/Api'
import configApi from '@/utils/configApi'

const api = new Api(configApi)

export default {
    namespaced: true,
    state: {
        limitSearchList: 5, // Сколько результатов отображать в списке поиска
        searchQuery: '', // Значение поисковой строки
        pokemonsNameList: [], // Все существующие имена
        pokemonNameFilterList: [], // Отфильтрованные по поиску имена (??? Убрать?)
    },
    getters: {
    },
    mutations: {
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

        setPokemonNameFilterList(state, payload) {
            state.pokemonNameFilterList = payload
        },
    },
    actions: {
        async loadPokemonNameList({ state, commit }) {
            try {
                if (!state.pokemonsNameList.length) {
                    const resolve = await api.fetchPokemons(1, state.totalPokemons)
                    commit('setPokemonNameList', resolve.data.results)
                    commit('loader/setIsLoadingNameList', false, { root: true })
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
}
