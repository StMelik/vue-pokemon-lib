export default {
    namespaced: true,

    state: {
        isLoadingList: true, // Состояние загрузки списка покемонов
        isLoadingPokemon: true, // Состояние загрузки информации о покемоне
        isLoadingNameList: true, // Состояние загрузки списка всех имен покемонов
    },

    mutations: {
        setIsLoadingList(state, payload) {
            state.isLoadingList = payload
        },

        setIsLoadingPokemon(state, payload) {
            state.isLoadingPokemon = payload
        },

        setIsLoadingNameList(state, payload) {
            state.isLoadingNameList = payload
        }
    }
}
