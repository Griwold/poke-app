import { useState, useEffect } from "react";
import Link from "next/link";
import { Grid, Box } from "@mui/material"

import { useAppSelector, useAppDispatch } from '../../constants/hooks'
import SearchBar from '../../components/SearchBar'
import PokemonCard from "./PokemonCard"
import { Container, CustomGridItem } from './pokemonStyles';
import { fetchPokemons } from "./pokemonSlice";

const Pokemons = () => {

    const pokemons = Object.values(useAppSelector(state => state.pokemons.entities));
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>('');

    const onSearch = () => {
        dispatch(fetchPokemons({ name }))
    };

    return (
        <Container>
            <Box m={2}>
                <SearchBar text={name} setText={setName} onSearch={onSearch}/>
            </Box>
            <Box mb={2}>
                <Grid container rowSpacing={2} columnSpacing={6} >
                    {pokemons.map(pokemon => {
                        if (pokemon) {
                            return (
                                <CustomGridItem item key={pokemon.name} xs={12} sm={4} lg={3}>
                                    <PokemonCard pokemon={pokemon} />
                                </CustomGridItem>
                            )
                        }
                    })}
                    {/* <Link href={'/newPage'}>Navigation to newPage</Link> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default Pokemons;
