<template>
    <main class="pokemon-page pokemon" v-if="!getIsLoading">
        <h1 class="pokemon__name">{{ getName }}</h1>
        <section class="pokemon__info">
            <div class="pokemon__image" :style="{ backgroundImage: `url(${getImage})` }"></div>
            <div class="pokemon__description">
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Type:</p>
                    <p class="pokemon__description-text">{{ getType }}</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Weight:</p>
                    <p class="pokemon__description-text">{{ getWeight }} kg</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Height:</p>
                    <p class="pokemon__description-text">{{ getHeight }} m</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Experience:</p>
                    <p class="pokemon__description-text">{{ getExperience }}</p>
                </div>

                <div class="pokemon__description-row pokemon__parametr-list">
                    <div class="pokemon__parametr pokemon__parametr_hp">{{ getStats.hp }}</div>
                    <div class="pokemon__parametr pokemon__parametr_attack">{{ getStats.attack }}</div>
                    <div class="pokemon__parametr pokemon__parametr_defense">{{ getStats.defense }}</div>
                    <div class="pokemon__parametr pokemon__parametr_special-attack">{{ getStats['special-attack'] }}
                    </div>
                    <div class="pokemon__parametr pokemon__parametr_special-defense">{{ getStats['special-defense'] }}
                    </div>
                    <div class="pokemon__parametr pokemon__parametr_speed">{{ getStats.speed }}</div>
                </div>
            </div>
        </section>
        <section class="pokemon__abilities abilities">
            <h2 class="pokemin__title abilities__title">Abilities</h2>
            <ul class="abilities__list">
                <li class="abilities__item" v-for="(item, i) in getAbilities" :key="i">{{ item }}</li>
            </ul>
        </section>
    </main>
    <preloader v-else />
</template>

<script>
import Preloader from './Preloader.vue'
export default {

    components: {
        Preloader
    },

    methods: {
        loadPokemonData() {
            const name = this.$route.params.name
            this.$store.dispatch('loadPokemon', { name, type: 'one' })
        }
    },

    computed: {
        getIsLoading() {
            return this.$store.state.isLoadingPokemon
        },

        getStats() {
            const stats = {}
            this.$store.state.pokemon.stats.forEach(i => stats[i.stat.name] = i['base_stat'])
            return stats
        },

        getName() {
            const name = this.$store.state.pokemon.name
            console.log(name);
            return name[0].toUpperCase() + name.slice(1)
        },

        getType() {
            return this.$store.state.pokemon.types.map(i => i.type.name).join(' / ')
        },

        getImage() {
            const mainImage = this.$store.state.pokemon.sprites.other.home['front_default']
            const image2 = this.$store.state.pokemon.sprites.other['official-artwork']['front_default'];
            const image3 = this.$store.state.pokemon.sprites['front_default']

            return mainImage ? mainImage : image2 ? image2 : image3
        },

        getWeight() {
            return this.$store.state.pokemon.weight / 10
        },

        getHeight() {
            return this.$store.state.pokemon.height / 10
        },

        getExperience() {
            return this.$store.state.pokemon['base_experience']
        },

        getAbilities() {
            const abilitiesObj = {
                1: '',
                2: '',
                3: ''
            }

            this.$store.state.pokemon.abilities.forEach(i => {
                let name = i.ability.name
                name = name[0].toUpperCase() + name.slice(1)

                if (name.includes('-')) {
                    name = name.split('-').join(' ')
                }

                abilitiesObj[i.slot] = name
            })

            return Object.values(abilitiesObj)
        },

    },

    mounted() {
        this.$store.commit('setIsLoadingPokemon', true)
        this.loadPokemonData()
        // console.log(this.$route.params.name);
        // console.log(this.$store.state.pokemon);
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

