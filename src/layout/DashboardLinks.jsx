import { Breadcrumbs, Button } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

function DashboardNav() {
    const navigate = useNavigate();
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Button
                    disableElevation
                    variant='outlined'
                    size='small'
                    onClick={() => navigate('/login')}
                    sx={{
                        borderRadius: 10,
                        textTransform: 'capitalize',
                        fontFamily: 'Nunito',
                        color: '#00398D',
                        borderColor: '#00398D',
                        borderWidth: 2,
                        fontWeight: 'bold'
                    }}
                >logout</Button>
            </Breadcrumbs>
        </>
    )
}

export default React.memo(DashboardNav)