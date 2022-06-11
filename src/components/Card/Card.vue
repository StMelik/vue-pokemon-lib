<template>
    <li class="main__item card" @click="$router.push(`/pokemon/${pokemon.name}`)">
        <div class="card__wrapper">
            <div class="card__image" :style="{ backgroundImage: `url(${pokemon.image})` }">
                <p class="card__name">{{ getName }}</p>
            </div>
            <div class="card__content">
                <div class="card__description">
                    <p class="card__description-title">Type:</p>
                    <p class="card__description-text">{{ pokemon.types }}</p>
                </div>
                <ul class="card__params params-card">
                    <li class="params-card__item params-card__item_hp">{{ pokemon.stats.hp }}</li>
                    <li class="params-card__item params-card__item_attack">{{ pokemon.stats.attack }}</li>
                    <li class="params-card__item params-card__item_defense">{{ pokemon.stats.defense }}</li>
                    <li class="params-card__item params-card__item_speed">{{ pokemon.stats.speed }}</li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script>
import { formatName } from '@/utils/formatPokemonInfo'

export default {
    name: 'card-pokemon',
    props: {
        pokemon: Object,
    },

    computed: {
        getName() {
            return formatName(this.pokemon.name)
        }
    },
}
</script>

<style>
@import './Card.css'
</style>
