<template>
    <header class="header">
        <nav class="header__nav nav-header">
            <ul class="nav-header__list">
                <li>
                    <button class="nav-header__link"
                        @click="$router.push({ name: 'home', query: { page: $store.state.page } })">Home</button>
                </li>
            </ul>
        </nav>

        <form class="header__search search-header" @submit.prevent="handleSubmitForm">
            <input class="search-header__input" type="text" placeholder="Search..." @input="handleInputForm"
                :value="searchQuery" minlength="2">
            <button class="search-header__button"></button>
            <ul class="search__list" v-if="!isLoadingNameList">
                <li class="search__item" v-for="(name) in getFilterName" :key="name">{{ name }}</li>
            </ul>
        </form>

    </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: 'main-header',

    methods: {
        ...mapMutations({
            setIsLoadingNameList: 'loader/setIsLoadingNameList',
            setPokemonNameFilterList: 'search/setPokemonNameFilterList',
            clearPokemonsList: 'pokemons/clearPokemonsList',
            setIsLoadingList: 'loader/setIsLoadingList',
            setTotalPokemons: 'pagination/setTotalPokemons',
            setSearchQuery: 'search/setSearchQuery',
        }),

        ...mapActions({
            loadPokemonNameList: 'search/loadPokemonNameList',
            loadPokemon: 'pokemons/loadPokemon',
        }),

        handleInputForm(evt) {
            // if (!this.pokemonsNameList) {
            this.setSearchQuery(evt.target.value)
            this.loadPokemonNameList()
            // }


            if (this.searchQuery.length > 1 && this.pokemonsNameList.length) {
                this.setIsLoadingNameList(false)
            } else {
                this.setIsLoadingNameList(true)
            }
            // console.log(this.getFilterName);
            this.setFilterName(this.searchQuery)

        },

        setFilterName(name) {
            // console.log(this.pokemonsNameList);
            const filterArr = this.pokemonsNameList.filter(i => {
                // console.log(i);
                return i.toLowerCase().startsWith(name.toLowerCase())
            })
            this.setPokemonNameFilterList(filterArr)



            return filterArr
        },

        handleSubmitForm() {
            if (this.searchQuery) {
                this.$router.push({ name: 'home', query: { search: this.searchQuery, page: this.page } })
            } else {
                this.$router.push({ name: 'home', query: { search: null, page: this.page } })
            }

            console.log(this.$route);

            this.setIsLoadingList(true)
            this.clearPokemonsList()
            this.setTotalPokemons(this.pokemonNameFilterList.length)
            this.pokemonNameFilterList.slice(0, this.limit).forEach(name => {
                this.loadPokemon({ name, type: 'filter' })
            })
        }
    },

    computed: {
        ...mapState({
            isLoadingNameList: state => state.loader.isLoadingNameList,
            pokemonsNameList: state => state.search.pokemonsNameList,
            pokemonNameFilterList: state => state.search.pokemonNameFilterList,
            limitSearchList: state => state.search.limitSearchList,
            limit: state => state.pagination.limit,
            page: state => state.pagination.page,
            searchQuery: state => state.search.searchQuery,
        }),

        getFilterName() {
            return this.pokemonNameFilterList.slice(0, this.limitSearchList)
        }

    }
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