import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction, EntityId } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

import { PokemonDataUseType, PokemonApiType } from '../../types/pokemon'

interface PokemonState extends EntityState<PokemonDataUseType> {
    status: string,
    data: any,
    filter: string
}

export const fetchPokemons = createAsyncThunk<
    // Return type of the payload creator
    { pokemons: PokemonDataUseType[], filter: string },
    // First argument to the payload creator
    { name: string }
>('pokemon/fetchPokemons', async ({ name }) => {

    let url: string = `https://pokeapi.co/api/v2/pokemon`;
    let response: any;
    let pokemons: PokemonDataUseType[];

    if (name) {

        url += `/${name}/`;

        response = await axios(url);

        pokemons = [{ name: response.data.name, image: response.data.sprites.other.home.front_default }]

    } else {

        response = await axios(url);

        pokemons = await Promise.all(
            response.data.results.map(async (pokemon: PokemonApiType) => {
                const fetchPokemon = await axios(pokemon.url);
                return { name: pokemon.name, image: fetchPokemon.data.sprites.other.home.front_default }
            })
        )

    }
    return { pokemons, filter: name }
})

export const pokemonAdapter = createEntityAdapter<PokemonDataUseType>({
    selectId: (pokemon) => pokemon.name,
});

const initialState: PokemonState = pokemonAdapter.getInitialState({
    status: 'idle',
    data: null,
    filter: ''
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
            pokemonAdapter.setAll(state, action.payload.pokemons)
            state.filter = action.payload.filter
        })
        builder.addCase(fetchPokemons.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPokemons.rejected, (state, action) => {
            state.status = action.error.code || 'failed'
        })
        builder.addCase(HYDRATE, (state, action: any) => {
            // if (!action.payload.pokemon) return state
            pokemonAdapter.setAll(state, action.payload.pokemons.data.results)
            state.status = 'success'
        })
    }
})

export const { setPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;