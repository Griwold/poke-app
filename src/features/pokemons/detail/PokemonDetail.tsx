/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router'
import { Card, CardMedia, Box, Typography, CircularProgress, Button } from '@mui/material';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../constants/hooks';
import { fetchPokemonDetail } from '../pokemonSlice';
import { Container } from './pokemonDetailStyles';


const PokemonDetail = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pokemon_detail = useAppSelector(state => state.pokemons.pokemon_detail);
    const status = useAppSelector(state => state.pokemons.status_detail);

    useEffect(() => {
        if (!pokemon_detail && router.query.id) {
            dispatch(fetchPokemonDetail({ id: router.query.id as string }));
        }
    }, [router.query.id, pokemon_detail, dispatch])

    const convertToFeetandInch = (meters: number) => {
        let height = meters * (1 / 0.0254);
        let feet = Math.floor(height / 12);
        let inches = (height - (feet * 12));
        return `${feet}'${Math.round(inches)}''`;
    }

    const convertHeight = () => {
        if (pokemon_detail) {
            const meters = pokemon_detail.height / 10;
            return `${convertToFeetandInch(meters)} (${meters}m)`;
        }
        return '0'
    }

    const convertWeight = () => {
        const lbs = ((pokemon_detail?.weight || 0) / 10) * 2.20462262185;
        return `${lbs.toFixed(2)} lbs (${(pokemon_detail?.weight || 0) / 10}kg)`;
    }

    const capitalizeUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const selectAbility = () => capitalizeUpperCase(pokemon_detail?.abilities.find(ability => !ability.is_hidden)?.ability.name || '');

    return (
        <Container>
            {status === 'loading' && <CircularProgress size={40} color='error' />}
            {status === 'success' &&
                <>
                    <Card sx={{ display: 'flex', margin: 10, alignItems: 'center', paddingBottom: 8 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '30%', marginRight: 12 }}
                            image={pokemon_detail?.sprites.other?.home.front_default}
                            alt={`pokemon ${pokemon_detail?.name}`}
                        />
                        <Box display={'flex'} flexDirection={'column'} width={'50%'}>
                            <Box display={'flex'} alignItems={'baseline'} mt={4}>
                                <Typography variant="h3">{pokemon_detail?.name}</Typography>
                                <Typography marginLeft={4} variant="h4" color="text.secondary">#{pokemon_detail?.id.toString().padStart(3, '0')} </Typography>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'} height={'100%'}>
                                <Box display={'flex'} mb={8} mt={6} >
                                    <Box flex={1}>
                                        <Typography variant="h5" color="text">Height</Typography>
                                        <Typography variant="h5" color="text.secondary">{convertHeight()}</Typography>
                                    </Box>
                                    <Box flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Typography variant="h5" color="text">Type</Typography>
                                        <Typography variant="h5" color="text.secondary">{capitalizeUpperCase(pokemon_detail?.types[0].type.name || '')}</Typography>
                                    </Box>
                                </Box>
                                <Box display={'flex'} >
                                    <Box flex={1}>
                                        <Typography variant="h5" color="text">Weight</Typography>
                                        <Typography variant="h5" color="text.secondary">{convertWeight()}</Typography>
                                    </Box>
                                    <Box flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Typography variant="h5" color="text">Abilities</Typography>
                                        <Typography variant="h5" color="text.secondary">{selectAbility()}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                    <Button variant='contained' onClick={() => router.push('/')}>Back</Button>
                </>
            }
        </Container>
    )
};

export default PokemonDetail;