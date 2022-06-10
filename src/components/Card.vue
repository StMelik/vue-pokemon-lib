<template>
    <li class="main__item card">
        <router-link to="/name">
            <div class="card__wrapper">
                <div class="card__image">
                    <p class="card__name">Charmeleon</p>
                </div>
                <div class="card__content">
                    <div class="card__description">
                        <div class="card__description-row">
                            <p class="card__description-title">Species:</p>
                            <p class="card__description-text">charmander</p>
                        </div>
                        <div class="card__description-row">
                            <p class="card__description-title">Type:</p>
                            <p class="card__description-text">fire</p>
                        </div>
                    </div>
                    <ul class="card__params params-card">
                        <li class="params-card__item params-card__item_hp">120</li>
                        <li class="params-card__item params-card__item_attack">56</li>
                        <li class="params-card__item params-card__item_defense">22</li>
                        <li class="params-card__item params-card__item_speed">180</li>
                    </ul>
                </div>
            </div>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'card-pokemon'
}
</script>

<style>
.card {
    color: #222222;
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
}

.card__description-row {
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.card__description-row:not(:last-child) {
    margin-bottom: 5px;
}

.card__description-title {
    font-size: 18px;
}

.card__description-text {}

.params-card {
    display: flex;
}

.params-card__item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: #E5E5E5CC;
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
