import * as React from 'react'
import NAVBAR from './NAVBAR'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'
import Copyright from '../pages/CopyRight'

function Layout() {
    return (
        <>
            <NAVBAR />
            <Grid
                container
                mt={'90px'}
                mb={'90px'}
                px={2}
            >
                <Outlet />
            </Grid>
            <Copyright />
        </>
    )
}

export default React.memo(Layout)