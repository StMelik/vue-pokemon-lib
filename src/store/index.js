import { createStore } from 'vuex'
import loaderModule from '@/store/modules/loader'
import paginationModule from '@/store/modules/pagination'
import searchModule from '@/store/modules/search'
import pokemonsModule from '@/store/modules/pokemons'

export default createStore({
  modules: {
    loader: loaderModule,
    pagination: paginationModule,
    search: searchModule,
    pokemons: pokemonsModule,
  }
})
