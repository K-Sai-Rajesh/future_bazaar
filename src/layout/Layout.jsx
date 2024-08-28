import * as React from 'react'
import NAVBAR from './NAVBAR'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'

function Layout() {
    return (
        <>
            <NAVBAR />
            <Grid
                container
                mt={'100px'}
               
                // border={'1px solid red'}
                px={2}
            >
                <Outlet />
            </Grid>
        </>
    )
}

export default React.memo(Layout)