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

        setQueryPath(page) { // Повтор в хедере
            (this.searchQuery)
                ? this.$router.push({
                    name: 'home',
                    query: { search: this.searchQuery, page }
                })
                : this.$router.push({
                    name: 'home',
                    query: { page }
                })
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
            totalPokemons: state => state.pagination.totalPokemons,
            limit: state => state.pagination.limit,
            page: state => state.pagination.page,
        }),

        ...mapGetters({
            getMaxPage: 'pagination/getMaxPage',
        }),
    },

    mounted() {

    }
}
</script>

<style>
.pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px 25px;
    margin-bottom: 50px;
}

.pagination__button {
    width: 50px;
    height: 50px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    background-image: url('../assets/icons/arrow-icon.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30px 30px;
    flex-shrink: 0;
}

.pagination__button_next {
    transform: rotate(180deg);
}

.pagination__links {
    display: flex;
    column-gap: 10px;
    align-items: flex-end;
}

.pagination__link {
    font-size: 32px;
}

.disabled {
    cursor: default;
}

.disabled:hover {
    opacity: 1;
}

.pagination__link_active {
    color: #FF7A00;
}

@media screen and (max-width: 550px) {
    .pagination__links {
        width: 100%;
        justify-content: center;
        order: -1;
    }
}
</style>