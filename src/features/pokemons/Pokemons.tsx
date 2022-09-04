import { useAppSelector } from '../../constants/hooks';
import Link from "next/link";
import { Grid, Box } from "@mui/material";
import PokemonCard from "./PokemonCard";

const Pokemons = () => {

    const pokemons = Object.values(useAppSelector(state => state.pokemons.entities));

    return (
        <Box width={800} mb={2}>
            <Grid container rowSpacing={2} columnSpacing={6}>
                {pokemons.map(pokemon => {
                    if (pokemon) {
                        return (
                            <Grid item key={pokemon.name} lg={3}>
                                <PokemonCard pokemon={pokemon} />
                            </Grid>
                        )
                    }
                })}
                {/* <Link href={'/newPage'}>Navigation to newPage</Link> */}
            </Grid>
        </Box>
    )
}

export default Pokemons;
