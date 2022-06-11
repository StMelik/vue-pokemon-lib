<template>
    <main class="main" v-if="!isLoading">
        <h1 class="title">Pokemons</h1>
        <ul class="main__list">
            <card v-for="item in pokemonsList" :key="item.id" :pokemon="item" />
        </ul>

        <pagination />
    </main>
    <h3 v-else-if="isNotFound" class="not-found">Nothing found!</h3>
    <preloader v-else />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Card from '@/components/Card/Card.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Preloader from '@/components/Preloader.vue'

export default {
    components: { Card, Pagination, Preloader },
    name: 'main-page',

    computed: {
        ...mapState({
            pokemonsList: state => state.pokemons.pokemonsList,
            isLoading: state => state.loader.isLoadingList,
            isNotFound: state => state.search.isNotFound,
        }),
    },

    methods: {
        ...mapMutations({
            setSearchQuery: 'search/setSearchQuery',
            setPage: 'pagination/setPage',
        }),

        ...mapActions({
            loadPokemons: 'pokemons/loadPokemons',
        }),

        loadPage() {
            const page = +this.$route.query.page || 1

            this.setSearchQuery(this.$route.query.search || '')
            this.setPage(page)
            this.loadPokemons(page)
        }
    },

    mounted() {
        this.loadPage()
    }
}
</script>

<style>
@import './Main.css'
</style>