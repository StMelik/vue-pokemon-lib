import Api from '@/utils/Api'
import configApi from '@/utils/configApi'

const api = new Api(configApi)

export default {
    namespaced: true,
    state: {
        limitSearchList: 5, // Сколько результатов отображать в списке поиска
        searchQuery: '', // Значение поисковой строки
        isShowSearchList: false,
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

        setIsShowSearchList(state, payload) {
            state.isShowSearchList = payload
        }
    },
    actions: {
        async loadPokemonNameList({ state, commit }) {
            const isEmptyPokemonsNameList = !state.pokemonsNameList.length
            try {
                // если списка имен нету
                if (isEmptyPokemonsNameList) {
                    const resolveTotal = await api.fetchPokemons()
                    // получить имена {totalPokemons} штук
                    const resolve = await api.fetchPokemons(1, resolveTotal.data.count)
                    // сохранить имена
                    commit('setPokemonNameList', resolve.data.results)
                    // commit('loader/setIsLoadingNameList', false, { root: true })
                }
            } catch (err) {
                console.log(err);
            }
        },

        // async loadTotalPokemons({ commit }) {
        //     try {
        //         const resolve = await api.fetchPokemons()
        //         commit('pagination/setTotalPokemons', resolve.data.count, { root: true })
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
    },
}
