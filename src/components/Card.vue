<template>
    <li class="main__item card" @click="$router.push(`/pokemon/${pokemon.name}`)">
        <div class="card__wrapper">
            <div class="card__image" :style="{ backgroundImage: `url(${getImage})` }">
                <p class="card__name">{{ getName }}</p>
            </div>
            <div class="card__content">
                <div class="card__description">
                    <p class="card__description-title">Type:</p>
                    <p class="card__description-text">{{ getType }}</p>
                </div>
                <ul class="card__params params-card">
                    <li class="params-card__item params-card__item_hp">{{ getStats.hp }}</li>
                    <li class="params-card__item params-card__item_attack">{{ getStats.attack }}</li>
                    <li class="params-card__item params-card__item_defense">{{ getStats.defense }}</li>
                    <li class="params-card__item params-card__item_speed">{{ getStats.speed }}</li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'card-pokemon',
    props: {
        pokemon: Object,
    },

    computed: {
        getStats() {
            const stats = {}

            this.pokemon.stats.forEach(i => stats[i.stat.name] = i['base_stat'])

            return stats
        },

        getName() {
            const name = this.pokemon.name

            return name[0].toUpperCase() + name.slice(1)
        },

        getType() {
            return this.pokemon.types.map(i => i.type.name).join(' / ')
        },

        getImage() {
            const mainImage = this.pokemon.sprites.other.home['front_default']
            const image2 = this.pokemon.sprites.other['official-artwork']['front_default'];
            const image3 = this.pokemon.sprites['front_default']

            return mainImage ? mainImage : image2 ? image2 : image3
        }
    },

    mounted() {
        // console.log(this.pokemon);
        // console.log(this.getImage);
    }


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
    background-image: url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png");
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
