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
import Preloader from '@/components/Preloader.vue'

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
@import './PokemonPage.css'
</style>

