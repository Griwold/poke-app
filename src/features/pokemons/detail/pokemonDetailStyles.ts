import { styled } from '@mui/material/styles'
import { Box, Grid } from '@mui/material'

export const CustomGridItem = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
}) as typeof Grid

export const Container = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
}) as typeof Box
