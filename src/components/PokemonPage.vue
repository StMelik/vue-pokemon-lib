<template>
    <main class="pokemon-page pokemon" v-if="!isLoadingPokemon">
        <h1 class="pokemon__name">{{ pokemon.name }}</h1>
        <section class="pokemon__info">
            <div class="pokemon__image" :style="{ backgroundImage: `url(${pokemon.image})` }"></div>
            <div class="pokemon__description">
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Type:</p>
                    <p class="pokemon__description-text">{{ pokemon.types }}</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Weight:</p>
                    <p class="pokemon__description-text">{{ pokemon.weight }} kg</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Height:</p>
                    <p class="pokemon__description-text">{{ pokemon.height }} m</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Experience:</p>
                    <p class="pokemon__description-text">{{ pokemon['base_experience'] }}</p>
                </div>

                <div class="pokemon__description-row pokemon__parametr-list">
                    <div class="pokemon__parametr pokemon__parametr_hp">{{ pokemon.stats.hp }}</div>
                    <div class="pokemon__parametr pokemon__parametr_attack">{{ pokemon.stats.attack }}</div>
                    <div class="pokemon__parametr pokemon__parametr_defense">{{ pokemon.stats.defense }}</div>
                    <div class="pokemon__parametr pokemon__parametr_special-attack">{{ pokemon.stats['special-attack']
                    }}
                    </div>
                    <div class="pokemon__parametr pokemon__parametr_special-defense">{{ pokemon.stats['special-defense']
                    }}
                    </div>
                    <div class="pokemon__parametr pokemon__parametr_speed">{{ pokemon.stats.speed }}</div>
                </div>
            </div>
        </section>
        <section class="pokemon__abilities abilities">
            <h2 class="pokemin__title abilities__title">Abilities</h2>
            <ul class="abilities__list">
                <li class="abilities__item" v-for="(item, i) in pokemon.abilities" :key="i">{{ item }}</li>
            </ul>
        </section>
    </main>
    <preloader v-else />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Preloader from './Preloader.vue'

export default {
    components: { Preloader },

    methods: {
        ...mapMutations({
            setIsLoadingPokemon: 'loader/setIsLoadingPokemon'
        }),

        ...mapActions({
            loadPokemon: 'pokemons/loadPokemon',
        }),

        loadPokemonData() {
            const name = this.$route.params.name
            this.loadPokemon({ name, type: 'one' })
        }
    },

    computed: {
        ...mapState({
            isLoadingPokemon: state => state.loader.isLoadingPokemon,
            pokemon: state => state.pokemons.pokemon,
        }),
    },

    mounted() {
        this.setIsLoadingPokemon(true)
        this.loadPokemonData()
    }
}
</script>

<style>
.pokemon__info {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 50px 100px;
    padding: 0 30px 50px;
    margin-bottom: 20px;
}

.pokemon__info::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-image: linear-gradient(90deg, #e5e5e5 0%, #e5e5e500 75%);
}

.pokemon__image {
    position: relative;
    height: 300px;
    width: 300px;
    background-color: #555555;
    background-repeat: no-repeat;
    background-size: 250px 250px;
    background-position: center top;
    border-radius: 50%;
    flex-shrink: 0;
}

.pokemon__name {
    position: relative;
    padding: 20px 40px;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 40px;
}

.pokemon__name::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 5px;
    background-image: linear-gradient(90deg, #e5e5e5 0%, #e5e5e500 75%);
}

.pokemon__description-row {
    display: flex;
    column-gap: 5px;
    font-size: 28px;
}

.pokemon__description-row:not(:last-child) {
    margin-bottom: 20px;
}

.pokemon__description-title {
    font-weight: 700;
}

.pokemon__parametr-list {
    flex-wrap: wrap;
    gap: 15px;
}

.pokemon__parametr {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #555;
    font-size: 30px;
    font-weight: 700;
    color: #E5E5E5;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60px 60px;
}

.pokemon__parametr_hp {
    background-image: url('../assets/icons/heart-icon.svg');
}

.pokemon__parametr_attack {
    background-image: url('../assets/icons/sword-icon.svg');
}

.pokemon__parametr_defense {
    background-image: url('../assets/icons/shield-icon.svg');
}

.pokemon__parametr_special-attack {
    background-image: url('../assets/icons/special-sword-icon.svg');
}

.pokemon__parametr_special-defense {
    background-image: url('../assets/icons/special-shield-icon.svg');
}

.pokemon__parametr_speed {
    background-image: url('../assets/icons/speed-icon.svg');
}

.abilities {
    padding: 0 40px 50px;
    margin-bottom: 20px;
}

.pokemin__title {
    font-size: 32px;
    margin-bottom: 25px;
}

.abilities__list {
    list-style: decimal;
    padding-left: 50px;
}

.abilities__item {
    font-size: 24px;
    line-height: 1.5;
}

@media screen and (max-width: 500px) {

    .pokemon__info,
    .abilities {
        padding: 0 0 50px;
    }
}
</style>

