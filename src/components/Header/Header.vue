<template>
    <header class="header">
        <nav class="header__nav nav-header">
            <ul class="nav-header__list">
                <li>
                    <button class="nav-header__link"
                        @click="$router.push({ name: 'home', query: { page, search: searchQuery } })">Home</button>
                </li>
            </ul>
        </nav>

        <form class="header__search search-header" @submit.prevent="handleSubmitForm">
            <input ref='input' class="search-header__input" type="text" placeholder="Search..."
                @input="setSearchQuery($event.target.value)" :value="searchQuery" minlength="2">
            <button class="search-header__button"></button>
            <ul class="search__list" v-if="isShowSearchList">
                <li class="search__item" v-for="(name) in getSeachList" :key="name">{{ name }}</li>
            </ul>
        </form>

    </header>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'

export default {
    name: 'main-header',

    methods: {
        ...mapMutations({
            clearPokemonsList: 'pokemons/clearPokemonsList',
            setIsLoadingList: 'loader/setIsLoadingList',
            setTotalPokemons: 'pagination/setTotalPokemons',
            setPage: 'pagination/setPage',
            setSearchQuery: 'search/setSearchQuery',
            setIsShowSearchList: 'search/setIsShowSearchList',
        }),

        ...mapActions({
            loadPokemonNameList: 'search/loadPokemonNameList',
            loadPokemon: 'pokemons/loadPokemon',
        }),

        setQueryPath() {
            const query = this.searchQuery
                ? { page: this.page, search: this.searchQuery }
                : { page: this.page }

            this.$router.push({ name: 'home', query })
        },

        handleSubmitForm() {
            this.setPage(1)
            this.setQueryPath()
            this.$refs.input.blur()
            this.setIsShowSearchList(false)
            this.setIsLoadingList(true)
            this.clearPokemonsList()
            this.setTotalPokemons(this.getPokemonNameFilterList.length)
            this.getPokemonNameFilterList.slice(0, this.limit).forEach(name => {
                this.loadPokemon({ name, type: 'multi' })
            })
        }
    },

    computed: {
        ...mapState({
            pokemonsNameList: state => state.search.pokemonsNameList,
            limit: state => state.pagination.limit,
            page: state => state.pagination.page,
            searchQuery: state => state.search.searchQuery,
            isShowSearchList: state => state.search.isShowSearchList,
        }),

        ...mapGetters({
            getPokemonNameFilterList: 'search/getPokemonNameFilterList',
            getSeachList: 'search/getSeachList',
        }),
    },

    watch: {
        searchQuery() {
            const hasSearchQuery = !!this.searchQuery
            const hasPokemonsNameList = !!this.pokemonsNameList
            const hasFocus = document.activeElement === this.$refs.input;

            this.loadPokemonNameList();

            (hasSearchQuery && hasPokemonsNameList && hasFocus)
                ? this.setIsShowSearchList(true)
                : this.setIsShowSearchList(false)
        }
    },
}
</script>

<style>
@import './Header.css'
</style>