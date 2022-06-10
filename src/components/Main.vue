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
            loadPokemons: 'pokemons/loadPokemons',
        }),

        loadPage() {
            const page = +this.$route.query.page
            const search = this.$route.query.search

            if (search) {
                this.loadPokemonNameList()
                // this.$store.commit('setPokemonNameFilterList')
                this.setSearchQuery(search)
            }

            this.loadPokemons(page)

            !Number.isNaN(page)
                ? this.setPage(page)
                : this.setPage(1)
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