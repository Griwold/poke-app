import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction, EntityId } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

import { PokemonDataUseType, PokemonApiType, PokemonFormApiType } from '../../types/pokemon'

interface PokemonState extends EntityState<PokemonDataUseType> {
    status: 'idle' | 'failed' | 'loading' | 'success',
    data: any
}

export const fetchPokemons = createAsyncThunk<
    // Return type of the payload creator
    PokemonDataUseType[],
    // First argument to the payload creator
    { name: string }
>('pokemon/fetchPokemons', async ({ name }) => {

    let url: string = `https://pokeapi.co/api/v2/pokemon`;
    
    console.log(name,'name');
    if (name) url += `/${name}/`;

    const response = await axios(url);
    console.log(response,'response');

    const pokemon: PokemonDataUseType[] = [{ name: response.data.name, image: response.data.sprites.other.home.front_default }]

    return pokemon
})

export const pokemonAdapter = createEntityAdapter<PokemonDataUseType>({
    selectId: (pokemon) => pokemon.name,
});

const initialState: PokemonState = pokemonAdapter.getInitialState({
    status: 'idle',
    data: null
})

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemons: (state, action: any) => {
            state.data = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            state.status = 'success'
            pokemonAdapter.setAll(state, action.payload)
        })
        builder.addCase(fetchPokemons.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPokemons.rejected, (state, action) => {
            state.status = 'failed'
        })
        builder.addCase(HYDRATE, (state, action: any) => {
            // if (!action.payload.pokemon) return state
            pokemonAdapter.setAll(state, action.payload.pokemons.data.results)
        })
    }
})

export const { setPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;