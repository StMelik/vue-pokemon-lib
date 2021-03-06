export default {
    namespaced: true,

    state: {
        totalPokemons: 0, // Всего покемонов
        limit: 10, // Отображаемое количество карточек на странице
        page: 1, // Номер страницы
    },

    getters: {
        getMaxPage(state) {
            return Math.ceil(state.totalPokemons / state.limit)
        }
    },

    mutations: {
        setTotalPokemons(state, payload) {
            state.totalPokemons = payload
        },

        setPage(state, payload) {
            state.page = payload
        },
    }
}
