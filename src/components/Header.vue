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
            (this.searchQuery)
                ? this.$router.push({
                    name: 'home',
                    query: { search: this.searchQuery, page: this.page }
                })
                : this.$router.push({
                    name: 'home',
                    query: { page: this.page }
                })
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
            limitSearchList: state => state.search.limitSearchList,
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
            const hasFocus = document.activeElement === this.$refs.input

            this.loadPokemonNameList();

            (hasSearchQuery && hasPokemonsNameList && hasFocus)
                ? this.setIsShowSearchList(true)
                : this.setIsShowSearchList(false)
        }
    },
}
</script>

<style>
.header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 30px 40px;
    padding: 30px;
    border-bottom: 1px solid #E5E5E5;
}

@media screen and (max-width: 500px) {
    .header {
        padding: 30px 0;
    }
}

.nav-header__list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 35px;
}

.nav-header__link {
    font-size: 30px;
}

.search-header {
    position: relative;
    display: flex;
}

.search-header__input {
    padding: 5px 15px;
    border: 2px solid #E5E5E5;
    border-radius: 20px 0 0 20px;
    background-color: transparent;
    color: inherit;
    font-size: 26px;
    width: 100%;
    height: 40px;
}

.search-header__button {
    width: 50px;
    height: 40px;
    border-radius: 0 20px 20px 0;
    background-color: #E5E5E5;
    background-image: url('../assets/icons/search-icon.svg');
    background-repeat: no-repeat;
    background-position: 40% center;
    background-size: 25px 25px;
    flex-shrink: 0;
}

.search__list {
    position: absolute;
    left: 0;
    right: 50px;
    transform: translateY(40px);
    background-color: #555555;
    z-index: 10;
    border-radius: 20px 0 20px 20px;
}

.search__item {
    font-size: 20px;
    padding: 15px 20px;
    transition: opacity .3s;
    cursor: pointer;
}

.search__item:hover {
    opacity: .5;
}

.search__item:not(:last-child) {
    border-bottom: 1px solid #E5E5E5;
}
</style>