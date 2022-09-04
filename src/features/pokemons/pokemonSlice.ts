import { createSlice, createAsyncThunk, createEntityAdapter, EntityState, PayloadAction, EntityId } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { PokemonDataUseType } from '../../types/pokemon'

interface PokemonState extends EntityState<PokemonDataUseType> {
    status: 'idle' | 'failed' | 'loading' | 'success',
    data: any
}

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async (foo) => {
        return foo
    }
)

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