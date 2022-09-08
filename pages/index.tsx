import axios from 'axios'
import { Box } from '@mui/material';

import Pokemons from '../src/features/pokemons/Pokemons'
import { wrapper } from '../src/store';
import { setPokemons } from '../src/features/pokemons/pokemonSlice'
import { PokemonApiType, PokemonType } from '../src/types/pokemon'

const App = () => (

	<Box
		display={'flex'}
		minHeight={'100vh'}
		justifyContent={'center'}
		// sx={{ backgroundColor: '#f7ccb9' }}
	>
		<Pokemons />
	</Box>
)

export default App;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	try {
		const response = await axios("https://pokeapi.co/api/v2/pokemon");

		const fetchDataPokemon: PokemonType[] = await Promise.all(
			response.data.results.map(async (pokemon: PokemonApiType) => {
				const fetchPokemon = await axios(pokemon.url);	
				return fetchPokemon.data
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