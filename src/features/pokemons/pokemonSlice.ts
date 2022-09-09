import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

import { PokemonApiType, PokemonType, InfoType } from '../../types/pokemon'
import { RootState } from '../../store'

interface PokemonState extends EntityState<PokemonType> {
    status: string,
    data: InfoType | null,
    filter: string,
    status_detail: string,
    pokemon_detail: PokemonType | null,
    next_page: string | null
}

export const fetchPokemons = createAsyncThunk<
    // Return type of the payload creator
    { pokemons: PokemonType[], filter: string, next_page: string | null },
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

        return { pokemons, filter: name, next_page: null }

    } else {

        response = await axios(url);
        pokemons = await Promise.all(
            response.data.results.map(async (pokemon: PokemonApiType) => {
                const fetchPokemon = await axios(pokemon.url);
                return fetchPokemon.data
            })
        )
        return { pokemons, filter: name, next_page: response.data.next }
    }
})

export const fetchPokemonPagining = createAsyncThunk<
    { pokemons: PokemonType[], next_page: string | null },
    void,
    { state: RootState }
>('pokemon/fetchPokemonPagining', async (args, { getState }) => {

    const nextPage = await getState().pokemons.next_page;

    let response;
    let pokemons: PokemonType[] = [];
    
    if(nextPage) {
        response = await axios(nextPage);
        pokemons = await Promise.all(
            response.data.results.map(async (pokemon: PokemonApiType) => {
                const fetchPokemon = await axios(pokemon.url);
                return fetchPokemon.data
            })
        )
    }
    return {pokemons, next_page: response?.data.next};
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
    pokemon_detail: null,
    next_page: null
})

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setPokemons: (state, action: PayloadAction<InfoType>) => {
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
            state.next_page = action.payload.next_page
        })
        builder.addCase(fetchPokemons.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchPokemons.rejected, (state, action) => {
            state.status = action.error.code || 'failed'
        })
        builder.addCase(HYDRATE, (state, action: any) => {
            pokemonAdapter.setAll(state, action.payload.pokemons.data.results)
            state.next_page = action.payload.pokemons.data.next
            state.status = 'success'
        })
        builder.addCase(fetchPokemonDetail.fulfilled, (state, action) => {
            state.pokemon_detail = action.payload
            state.status_detail = 'success'
        })
        builder.addCase(fetchPokemonDetail.pending, (state, action) => {
            state.status_detail = 'loading'
        })
        builder.addCase(fetchPokemonDetail.rejected, (state, action) => {
            state.status_detail = action.error.code || 'failed'
        })
        builder.addCase(fetchPokemonPagining.fulfilled, (state, action) => {
            state.next_page = action.payload.next_page
            pokemonAdapter.addMany(state, action.payload.pokemons)
        })
        builder.addCase(fetchPokemonPagining.pending, (state, action) => {
        })
        builder.addCase(fetchPokemonPagining.rejected, (state, action) => {
        })
    }
})

export const { setPokemons } = pokemonSlice.actions;

export const { setPokemonDetail } = pokemonSlice.actions;

export default pokemonSlice.reducer;