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

    mounted() {

        // this.$store.dispatch('loadPokemons', 1)
        // this.$store.commit('setIsLoadingList', true)
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