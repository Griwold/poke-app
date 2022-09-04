import { styled } from '@mui/material/styles'
import { Box, Grid } from '@mui/material'

export const Container = styled(Box) `
    width: 1000px; 
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;  
`

export const CustomGridItem = styled(Grid)`
    display: flex;
    justify-content: center;
    align-item: center;
`