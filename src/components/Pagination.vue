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
import { mapActions, mapMutations, mapState } from 'vuex'

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

        handleClickButton(evt) {
            const page = evt.target.textContent
            if (page !== '...') {
                if (this.searchQuery) {
                    this.$router.push({ name: 'home', query: { search: this.searchQuery, page } })
                } else {
                    this.$router.push({ name: 'home', query: { search: null, page } })
                }

                // this.$router.push({ name: 'home', query: { page } })
                this.setIsLoadingList(true)
                // this.$store.commit('clearPokemonsList')
                this.setPage(+page)
                this.loadPokemons(page)
            }
        },

        handleClickNextButton() {
            const maxPage = this.calculateMaxPage
            const page = this.page + 1

            if (this.page < maxPage) {
                this.setIsLoadingList(true)
                this.setPage(page)
                this.loadPokemons(page)
                this.$router.push({ name: 'home', query: { page } })
            }
        },

        handleClickPrevButton() {
            const page = this.page - 1
            if (this.page > 1) {
                this.setIsLoadingList(true)
                this.setPage(page)
                this.loadPokemons(page)
                this.$router.push({ name: 'home', query: { page } })
            }
        },

        renderPagination(page) {
            const maxPage = this.calculateMaxPage
            let list = []

            console.log(maxPage);

            if (maxPage <= 5) {
                console.log('maxPage < 5');
                for (let i = 1; i <= maxPage; i++) {
                    console.log(i);
                    list.push(i)
                }
                console.log('list pagin', list);
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

        calculateMaxPage() {
            return Math.ceil(this.totalPokemons / this.limit)
        }
    },

    mounted() {
        // console.log(this.$route.query.page);
        // this.$store.dispatch('loadPokemons', this.$route.query.page)
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