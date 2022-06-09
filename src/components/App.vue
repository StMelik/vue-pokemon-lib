<template>
  <div class="container">
    <MainHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from './Header.vue'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  color: #E5E5E5;
  background-color: #222222;
}

ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
  transition: opacity .3s;
}

button {
  border: none;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  transition: opacity .3s;
}

a:hover,
button:hover {
  opacity: .5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
