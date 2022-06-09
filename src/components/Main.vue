<template>
    <main class="main">
        <h1 class="title">Pokemons</h1>
        <ul class="main__list">
            <card />
            <card />
            <card />
            <card />
            <card />
            <card />
            <card />
            <card />
            <card />
            <card />
        </ul>

        <pagination />
    </main>
</template>

<script>
import Card from './Card.vue'
import Pagination from './Pagination.vue'
export default {
    components: { Card, Pagination },
    name: 'main-page',
}
</script>

<style>
.main {
    padding-top: 30px;
}

.title {
    font-size: 48px;
    margin-bottom: 40px;
    text-align: center;
}

.main__list {
    display: grid;
    grid-template-columns: repeat(5, 198px);
    gap: 30px;
    margin-bottom: 50px;
}
</style>