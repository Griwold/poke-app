/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router'

import { Card, CardMedia, Box, Typography } from '@mui/material';

const PokemonDetail = () => {
    const router = useRouter();
    return (
        <Card sx={{ display: 'flex', margin: 10 }}>
            <CardMedia
                component="img"
                sx={{ width: '30%', marginRight: 12 }}
                image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png"
                alt={`pokemon ${router.query.name}`}
            />
            <Box display={'flex'} flexDirection={'column'} width={'50%'}>
                <Box display={'flex'} alignItems={'baseline'} mt={4}>
                    <Typography variant="h3">Charmender</Typography>
                    <Typography marginLeft={4} variant="h4" color="text.secondary"> #013 </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
                    <Box display={'flex'} mb={8} mt={6} >
                        <Box flex={1}>
                            <Typography variant="h5" color="text">Heigth</Typography>
                            <Typography variant="h5" color="text.secondary">1'12" (0.6mm)</Typography>
                        </Box>
                        <Box flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography variant="h5" color="text">Type</Typography>
                            <Typography variant="h5" color="text.secondary">Fire</Typography>
                        </Box>
                    </Box>
                    <Box display={'flex'} >
                        <Box flex={1}>
                            <Typography variant="h5" color="text">width</Typography>
                            <Typography variant="h5" color="text.secondary">18.73 lbs(8.5kg)</Typography>
                        </Box>
                        <Box flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography variant="h5" color="text">Abilities</Typography>
                            <Typography variant="h5" color="text.secondary">Blaze</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
};

export default PokemonDetail;