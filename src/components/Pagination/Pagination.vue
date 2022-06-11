<template>
    <div class="pagination">
        <button class="pagination__button pagination__button_prev" @click="handleClickPrevButton"></button>
        <div class="pagination__links">
            <button class="pagination__link" @click="handleClickButton" v-for="(p, i) in renderPagination(page)"
                :key="i" :class="{
                    'pagination__link_active': p === page,
                    'disabled': p === '...'
                }">
                {{ p }}
            </button>
        </div>
        <button class="pagination__button pagination__button_next" @click="handleClickNextButton"></button>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'main-pagination',

    methods: {
        ...mapMutations({
            setIsLoadingList: 'loader/setIsLoadingList',
            setPage: 'pagination/setPage',
        }),

        ...mapActions({
            loadPokemons: 'pokemons/loadPokemons',
        }),

        setQueryPath(page) {
            const query = this.searchQuery
                ? { page, search: this.searchQuery }
                : { page }

            this.$router.push({ name: 'home', query })
        },

        loadPage(page) {
            this.setIsLoadingList(true)
            this.setPage(+page)
            this.loadPokemons(page)
            this.setQueryPath(page)
        },

        handleClickButton(evt) {
            const page = evt.target.textContent
            if (page !== '...') {
                this.loadPage(page)
            }
        },

        handleClickNextButton() {
            if (this.page < this.getMaxPage) {
                this.loadPage(this.page + 1)
            }
        },

        handleClickPrevButton() {
            if (this.page > 1) {
                this.loadPage(this.page - 1)
            }
        },

        renderPagination(page) {
            const maxPage = this.getMaxPage
            let list = []

            if (maxPage <= 5) {
                for (let i = 1; i <= maxPage; i++) {
                    list.push(i)
                }

                return list
            }

            if (page <= 3) {
                list = [1, 2, 3, 4, '...', maxPage]
            } else if (page >= maxPage - 2) {
                list = [1, '...', maxPage - 3, maxPage - 2, maxPage - 1, maxPage]
            } else {
                list = [1, '...', page - 1, page, page + 1, '...', maxPage]
            }

            return list
        }
    },

    computed: {
        ...mapState({
            searchQuery: state => state.search.searchQuery,
            page: state => state.pagination.page,
        }),

        ...mapGetters({
            getMaxPage: 'pagination/getMaxPage',
        }),
    },
}
</script>

<style>
@import './Pagination.css'
</style>