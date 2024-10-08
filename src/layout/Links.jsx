import { Breadcrumbs, Button, Typography } from '@mui/material'
import * as React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CookiesNames, getCookieItem } from '../helpers/cookies';

const links = ["", "categories"]

function Links() {
    const navigate = useNavigate();
    const token = getCookieItem(CookiesNames?.ACCESS_TOKEN);
    return (
        <>
            {
                links?.map(item => {
                    return (
                        <NavLink
                            to={`/${item}`}
                            exact
                            style={({ isActive }) => ({
                                color: isActive ? "#00398D" : "#3F3D56",
                                textDecorationLine: isActive ? 'underline' : 'none'
                            })}
                        >
                            <Typography
                                fontFamily={'Nunito'}
                                textTransform={'capitalize'}
                                fontSize={14}
                                fontWeight={'bold'}
                            >
                                {
                                    item === "" ? "home" : item
                                }
                            </Typography>
                        </NavLink>
                    )
                })
            }
            <Breadcrumbs aria-label="breadcrumb">
                <Button
                    disableElevation
                    variant='outlined'
                    size='small'
                    sx={{
                        borderRadius: 10,
                        textTransform: 'capitalize',
                        fontFamily: 'Nunito',
                        color: '#3F3D56',
                        borderColor: '#3F3D56',
                        borderWidth: 2,
                        fontWeight: 'bold'
                    }}
                    onClick={() => navigate('/register')}
                >register as Seller</Button>
                {
                    token ?
                        <Button
                            disableElevation
                            variant='outlined'
                            size='small'
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                borderRadius: 10,
                                textTransform: 'capitalize',
                                fontFamily: 'Nunito',
                                color: '#00398D',
                                borderColor: '#00398D',
                                borderWidth: 2,
                                fontWeight: 'bold'
                            }}
                        >Dashboard</Button>
                        :
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
                        >login</Button>
                }
            </Breadcrumbs>
        </>
    )
}

export default React.memo(Links)