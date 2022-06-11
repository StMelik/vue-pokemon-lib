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
.card {
    color: #222222;
    cursor: pointer;
}

.card__wrapper {
    background-color: #E5E5E5;
    border: 2px solid #505050;
    border-radius: 10px;
    overflow: hidden;
}

.card__image {
    position: relative;
    background-repeat: no-repeat;
    background-size: 160px 160px;
    background-position: center top;
    height: 200px;
    border-bottom: 2px solid #505050;
}

.card__name {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(90deg, #505050 0%, rgba(34, 34, 34, 0) 75%);
    ;
    padding: 4px 10px 2px;
    font-size: 20px;
}

.card__content {
    background-image: linear-gradient(180deg, rgba(80, 80, 80, 0) -15%, #505050 100%);
    ;
}

.card__description {
    padding: 10px 5px;
    border-bottom: 2px solid #505050;
    text-align: center;
}

.card__description-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
}

.params-card {
    display: flex;
}

.params-card__item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: #E5E5E5;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 35px 35px;
    height: 50px;
    width: 25%;
}

.params-card__item:not(:last-child) {
    border-right: 2px solid #505050;
}

.params-card__item_hp {
    background-image: url('../assets/icons/heart-icon.svg');
}

.params-card__item_attack {
    background-image: url('../assets/icons/sword-icon.svg');
}

.params-card__item_defense {
    background-image: url('../assets/icons/shield-icon.svg');
}

.params-card__item_speed {
    background-image: url('../assets/icons/speed-icon.svg');
}
</style>
