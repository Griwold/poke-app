import { styled } from '@mui/material/styles'
import { Box, Grid } from '@mui/material'

interface BoxType {
    bgcolor: string
}

export const Container = styled(Box)<BoxType>(({ bgcolor }) => ({
    width: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})) as typeof Box

export const CustomGridItem = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
}) as typeof Grid
