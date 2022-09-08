import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction, EntityId } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

import { PokemonApiType, PokemonType } from '../../types/pokemon'

interface PokemonState extends EntityState<PokemonType> {
    status: string,
    data: any,
    filter: string,
    status_detail: string,
    pokemon_detail: PokemonType | null
}

export const fetchPokemons = createAsyncThunk<
    // Return type of the payload creator
    { pokemons: PokemonType[], filter: string },
    // First argument to the payload creator
    { name: string }
>('pokemon/fetchPokemons', async ({ name }) => {

    let url: string = `https://pokeapi.co/api/v2/pokemon`;
    let response: any;
    let pokemons: PokemonType[];

    if (name) {

        url += `/${name}/`;
        response = await axios(url);
        pokemons = [response.data]

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

export const fetchPokemonDetail = createAsyncThunk<
    PokemonType,
    { id: string }
>('pokemon/fetchPokemonDetail', async ({ id }) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const response = await axios(url);

    return response.data;

})

export const pokemonAdapter = createEntityAdapter<PokemonType>({
    selectId: (pokemon) => pokemon.id,
});

const initialState: PokemonState = pokemonAdapter.getInitialState({
    status: 'idle',
    data: null,
    filter: '',
    status_detail: 'idle',
    pokemon_detail: null
})

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemons: (state, action: any) => {
            console.log(action, 'action');
            
            state.data = action.payload
        },
        setPokemonDetail: (state, action) => {
            state.pokemon_detail = action.payload
            state.status_detail = 'success'
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
        builder.addCase(fetchPokemonDetail.fulfilled, (state, action) => {
            state.status_detail = 'success'
            state.pokemon_detail = action.payload
        })
        builder.addCase(fetchPokemonDetail.pending, (state, action) => {
            state.status_detail = 'loading'
        })
        builder.addCase(fetchPokemonDetail.rejected, (state, action) => {
            state.status_detail = action.error.code || 'failed'
        })
    }
})

export const { setPokemons } = pokemonSlice.actions;

export const { setPokemonDetail } = pokemonSlice.actions;

export default pokemonSlice.reducer;