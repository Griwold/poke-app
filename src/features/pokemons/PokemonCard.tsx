import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { PokemonDataUseType } from '../../types/pokemon'

const PokemonCard: FC<{pokemon: PokemonDataUseType}> = ({pokemon}) => {

    return (
        <Card sx={{ width: 200 }}>
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