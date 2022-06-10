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
import { mapState } from 'vuex'

export default {
    components: { Card, Pagination, Preloader },
    name: 'main-page',

    computed: {
        ...mapState({
            pokemonsList: state => state.pokemonsList,
            isLoading: state => state.isLoadingList,
        }),
    },

    methods: {
        loadPage(page) {
            this.$store.dispatch('loadPokemons', page)
            console.log('p', page);
            if (!Number.isNaN(page)) {
                console.log('isNaN', page);
                this.$store.commit('setPage', page)
            } else {
                this.$store.commit('setPage', 1)
            }

        }
    },

    mounted() {
        console.log(typeof NaN);
        // this.$store.dispatch('loadPokemons', 1)
        // this.$store.commit('setIsLoadingList', true)
        this.loadPage(+this.$route.query.page)
        // this.$store.dispatch('loadPokemons', this.$route.query.page)
        // this.$store.commit('setPage', +this.$route.query.page)
        // console.log('route main', this.$route);
        // console.log('page main', this.$route.query.page);
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