import { FC } from 'react'
import {
    CardActionArea,
    Typography,
    CardMedia,
    CardContent,
    Card
} from '@mui/material'
import { useRouter } from 'next/router'

import { PokemonType } from '../../types/pokemon'
import { setPokemonDetail } from './pokemonSlice'
import { useAppDispatch } from '../../constants/hooks'

interface PomekonCardType {
    pokemon: PokemonType
}

const PokemonCard: FC<PomekonCardType> = ({ pokemon }) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onDetail = () => {
        dispatch(setPokemonDetail(pokemon))
        router.push(`/pokemon/${pokemon.id}`);
    }

    return (
        <Card sx={{ width: 250 }} onClick={onDetail}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image={pokemon.sprites.other?.home.front_default}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign={'center'} >
                        #{pokemon.id.toString().padStart(3, '0')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PokemonCard;