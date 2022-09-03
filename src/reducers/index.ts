import { combineReducers } from '@reduxjs/toolkit'

import pokemons from '../features/pokemons/pokemonSlice'

const rootReducers: combineReducers({
    pokemons
})