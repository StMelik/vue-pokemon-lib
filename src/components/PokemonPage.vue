<template>
    <main class="pokemon-page pokemon">
        <h1 class="pokemon__name">Dragonred</h1>
        <section class="pokemon__info">
            <div class="pokemon__image"></div>
            <div class="pokemon__description">
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Species:</p>
                    <p class="pokemon__description-text">charmander</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Gender:</p>
                    <p class="pokemon__description-text">male, female</p>
                </div>
                <div class="pokemon__description-column">
                    <div class="pokemon__description-row">
                        <p class="pokemon__description-title">Weight:</p>
                        <p class="pokemon__description-text">19 kg</p>
                    </div>
                    <div class="pokemon__description-row">
                        <p class="pokemon__description-title">Height:</p>
                        <p class="pokemon__description-text">1.1 m</p>
                    </div>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Type:</p>
                    <p class="pokemon__description-text">fire</p>
                </div>
                <div class="pokemon__description-row">
                    <p class="pokemon__description-title">Experience:</p>
                    <p class="pokemon__description-text">142</p>
                </div>

                <div class="pokemon__description-row pokemon__parametr-list">
                    <div class="pokemon__parametr pokemon__parametr_hp">125</div>
                    <div class="pokemon__parametr pokemon__parametr_attack">58</div>
                    <div class="pokemon__parametr pokemon__parametr_defense">62</div>
                    <div class="pokemon__parametr pokemon__parametr_special-attack">20</div>
                    <div class="pokemon__parametr pokemon__parametr_special-defense">10</div>
                    <div class="pokemon__parametr pokemon__parametr_speed">199</div>
                </div>
            </div>
        </section>
        <section class="pokemon__abilities abilities">
            <h2 class="pokemin__title abilities__title">Abilities</h2>
            <ul class="abilities__list">
                <li class="abilities__item">Blaze</li>
                <li class="abilities__item"></li>
                <li class="abilities__item">Solar-power</li>
            </ul>
        </section>
        <section class="pokemon__items items">
            <h2 class="pokemin__title items__title">Held items</h2>
            <ul class="items__list">
                <li class="items__item">Some item 1</li>
                <li class="items__item">Some item 2</li>
                <li class="items__item">Some item 3</li>
            </ul>
        </section>
    </main>
</template>

<script>
export default {

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

.pokemon__image {
    position: relative;
    height: 300px;
    width: 300px;
    background-color: #555555;
    border-radius: 50%;
    flex-shrink: 0;
}

.pokemon__image::after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png");
    background-repeat: no-repeat;
    background-size: 300px 300px;
    background-position: center;
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

.pokemon__description-row:not(:last-child):not(.pokemon__description-column .pokemon__description-row) {
    margin-bottom: 15px;
}

.pokemon__description-column {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 30px;
    margin-bottom: 15px;
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
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #555;
    font-size: 22px;
    font-weight: 700;
    color: #E5E5E5CC;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 35px 35px;
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
    position: relative;
    padding: 0 40px 50px;
    margin-bottom: 20px;
}

.pokemon__info::after,
.abilities::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    background-image: linear-gradient(90deg, #e5e5e5 0%, #e5e5e500 75%);
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

.items {
    padding: 0 40px 50px;
    margin-bottom: 50px;
}

.items__list {
    list-style: disc;
    padding-left: 50px;
}

.items__item {
    font-size: 24px;
    line-height: 1.5;
}

@media screen and (max-width: 500px) {

    .pokemon__info,
    .abilities,
    .items {
        padding: 0 0 50px;
    }
}
</style>

