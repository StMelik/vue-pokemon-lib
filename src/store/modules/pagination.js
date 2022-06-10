export default {
    namespaced: true,

    state: {
        totalPokemons: 0, // Всего покемонов
        limit: 10, // Отображаемое количество карточек на странице
        page: 1, // Номер страницы
        buttons: 5, // Количество кнопок пагинации (В планах)
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
