import { useState } from "react";
import { Grid, Box, CircularProgress } from "@mui/material"
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppSelector, useAppDispatch } from '../../constants/hooks'
import SearchBar from '../../components/SearchBar'
import PokemonCard from "./PokemonCard"
import { Container, CustomGridItem, ContainerFeedback } from './pokemonStyles';
import { fetchPokemons, fetchPokemonPagining } from "./pokemonSlice";

const Pokemons = () => {

    const pokemons = Object.values(useAppSelector(state => state.pokemons.entities));
    const status = useAppSelector(state => state.pokemons.status);
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');

    const onSearch = () => {
        dispatch(fetchPokemons({ name }))
    };

    const onPagining = () => {
        dispatch(fetchPokemonPagining());
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box m={2}>
                <SearchBar text={name} setText={setName} onSearch={onSearch} />
            </Box>
            {status === 'loading' && <ContainerFeedback><CircularProgress size={40} color='error' /></ContainerFeedback>}
            {status === 'ERR_BAD_REQUEST' && <ContainerFeedback>No se ha encontrado el pokemon</ContainerFeedback>}
            {status === 'success' &&
                <Container >
                    <InfiniteScroll
                        dataLength={pokemons.length} //This is important field to render the next data
                        next={onPagining}
                        hasMore={true}
                        loader={<Box display={'flex'} justifyContent={'center'} mt={2} mb={2}><CircularProgress size={20} color='error' /></Box>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        } 
                        // below props only if you need pull down functionality
                    >
                       <Grid container rowSpacing={2} columnSpacing={6} >
                            {pokemons.map(pokemon => {
                                if (pokemon) {
                                    return (
                                        <CustomGridItem item key={pokemon.name} xs={12} sm={6} md={4} lg={pokemons.length === 1 ? 12 : 3}>
                                            <PokemonCard pokemon={pokemon} />
                                        </CustomGridItem>
                                    )
                                }
                            })}
                        </Grid>
                    </InfiniteScroll>
                    {/* <Box mb={2}>
                        <Grid container rowSpacing={2} columnSpacing={6} >
                            {pokemons.map(pokemon => {
                                if (pokemon) {
                                    return (
                                        <CustomGridItem item key={pokemon.name} xs={12} sm={6} md={4} lg={pokemons.length === 1 ? 12 : 3}>
                                            <PokemonCard pokemon={pokemon} />
                                        </CustomGridItem>
                                    )
                                }
                            })}
                        </Grid>
                    </Box> */}
                </Container>
            }
        </Box>
    )
}

export default Pokemons;
