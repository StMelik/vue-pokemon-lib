<template>
    <header class="header">
        <nav class="header__nav nav-header">
            <ul class="nav-header__list">
                <li>
                    <router-link class="nav-header__link" to="/">Home</router-link>
                </li>
            </ul>
        </nav>

        <form class="header__search search-header">
            <input class="search-header__input" type="text" placeholder="Search...">
            <button class="search-header__button"></button>
        </form>

    </header>
</template>

<script>
export default {
    name: 'main-header'
}
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 50px;
    padding: 30px;
    border-bottom: 1px solid #E5E5E5;
}

.nav-header__list {
    display: flex;
    column-gap: 35px;
}

.nav-header__link {
    font-size: 30px;
}

.search-header {
    display: flex;
}

.search-header__input {
    padding: 5px 15px;
    border: 2px solid #E5E5E5;
    border-radius: 20px 0 0 20px;
    background-color: transparent;
    color: inherit;
    font-size: 26px;
    max-width: 250px;
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
}
</style>