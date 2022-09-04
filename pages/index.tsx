import axios from 'axios'
import { Box } from '@mui/material';

import Pokemons from '../src/features/pokemons/Pokemons'
import { wrapper } from '../src/store';
import { setPokemons } from '../src/features/pokemons/pokemonSlice'
import { PokemonApiType, PokemonDataUseType } from '../src/types/pokemon'

const App = () => (

	<Box display={'flex'} minHeight={'100vh'} justifyContent={'center'} alignItems={'center'} sx={{ backgroundColor: '#f7ccb9' }}>
		<Pokemons />
	</Box>
)

export default App;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {

	try {
		const response = await axios("https://pokeapi.co/api/v2/pokemon");

		const fetchDataPokemon: PokemonDataUseType[] = await Promise.all(
			response.data.results.map(async (pokemon: PokemonApiType) => {
				const fetchPokemon = await axios(pokemon.url);
				return { name: pokemon.name, image: fetchPokemon.data.sprites.other['official-artwork'].front_default }
			})
		)

		store.dispatch(setPokemons({ ...response.data, results: fetchDataPokemon }))
	} catch (error) {
		console.log('error >>>>>>>>', error);
	}

	return {
		props: {}
	}

})