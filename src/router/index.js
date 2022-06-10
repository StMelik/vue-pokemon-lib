import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main'
import PokemonPage from '../components/PokemonPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: PokemonPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
