import { FC } from 'react'
import { 
    CardActionArea, 
    Typography, 
    CardMedia, 
    CardContent, 
    Card 
} from '@mui/material'
import { useRouter } from 'next/router'

import { PokemonDataUseType } from '../../types/pokemon'

interface PomekonCardType {
    pokemon: PokemonDataUseType
}

const PokemonCard: FC<PomekonCardType> = ({pokemon}) => {
    const router = useRouter();
    return (
        <Card sx={{ width: 250 }} onClick={() => router.push(`pokemon/${pokemon.name}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image={pokemon.image}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                        {pokemon.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign={'center'} >
                        #{pokemon.image.split('/').pop()?.split('.')[0].padStart(3, '0')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PokemonCard;