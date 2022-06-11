<template>
    <main class="main" v-if="!isLoading">
        <h1 class="title">Pokemons</h1>
        <ul class="main__list">
            <card v-for="item in pokemonsList" :key="item.id" :pokemon="item" />

        </ul>

        <pagination />
    </main>
    <preloader v-else />
</template>

<script>
import Card from './Card.vue'
import Pagination from './Pagination.vue'
import Preloader from './Preloader.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    components: { Card, Pagination, Preloader },
    name: 'main-page',

    computed: {
        ...mapState({
            pokemonsList: state => state.pokemons.pokemonsList,
            isLoading: state => state.loader.isLoadingList,
        }),
    },

    methods: {
        ...mapMutations({
            setSearchQuery: 'search/setSearchQuery',
            setPage: 'pagination/setPage',
        }),

        ...mapActions({
            loadPokemonNameList: 'search/loadPokemonNameList',
            // loadTotalPokemons: 'search/loadTotalPokemons',
            loadPokemons: 'pokemons/loadPokemons',
        }),

        // checkQueryPageUrl(query) {
        //     if (typeof query !== 'number') {
        //         this.$router.push({ query: {} })
        //     }
        // },

        async loadPage() {
            const page = +this.$route.query.page || 1
            const search = this.$route.query.search

            if (search) {
                this.setSearchQuery(search)
                await this.loadPokemonNameList()
            }

            await this.loadPokemons(page) // Отрисовать карточки по странице
            this.setPage(page)
        }
    },

    mounted() {
        this.loadPage()
    }
}
</script>

<style>
.main {
    padding-top: 30px;
}

.title {
    font-size: 48px;
    margin-bottom: 40px;
    text-align: center;
}

.main__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(198px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
}
</style>