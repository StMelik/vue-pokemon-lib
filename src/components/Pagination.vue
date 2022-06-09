<template>
    <div class="pagination">
        <button class="pagination__button pagination__button_prev"></button>
        <div class="pagination__links">
            <button class="pagination__link pagination__link_active">1</button>
            <button class="pagination__link">2</button>
            <button class="pagination__link">3</button>
            <button class="pagination__link">4</button>
            <button class="pagination__link">5</button>
            <p class="pagination__link">...</p>
            <button class="pagination__link">55</button>
        </div>
        <button class="pagination__button pagination__button_next"></button>
    </div>
</template>

<script>
export default {
    name: 'main-pagination',
}
</script>

<style>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 25px;
    margin-bottom: 50px;
}

.pagination__button {
    width: 50px;
    height: 50px;
    border: 2px solid #E5E5E5;
    border-radius: 50%;
    background-image: url('../assets/icons/arrow-icon.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30px 30px;
}

.pagination__button_next {
    transform: rotate(180deg);
}

.pagination__links {
    display: flex;
    column-gap: 10px;
    align-items: flex-end;
}

.pagination__link {
    font-size: 32px;
}

.pagination__link_active {
    color: #FF7A00;
}
</style>