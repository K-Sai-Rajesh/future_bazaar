import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Chip, ListItemIcon, MenuItem, Stack } from '@mui/material';
import { CurrencyRupeeOutlined, LocationCityOutlined, ShareLocationOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

export default function ProductCard({ title, description, mrp, price, shop, category, subcategory, longitude, latitude, error }) {
    const navigate = useNavigate()
    return (
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardHeader
                action={
                    <>
                        <Stack
                            spacing={{ xs: 1 }}
                            direction="row"
                            useFlexGap
                            sx={{
                                flexWrap: 'wrap', justifyContent: "end",
                                alignItems: "center"
                            }}
                        >
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </Stack>
                    </>
                }
                title={

                    <Stack
                        spacing={{ xs: 1 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap', justifyContent: "start",
                            alignItems: "center", py: 1
                        }}
                    >
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'20px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            {title}
                        </Typography>
                    </Stack>
                }
                subheader={
                    <Stack
                        spacing={{ xs: 1 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap', justifyContent: "start",
                            alignItems: "start"
                        }}
                    >
                        <Chip
                            sx={{
                                cursor: 'pointer'
                            }}
                            size="large"
                            variant={"outlined"}
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                >
                                    {category}
                                </Typography>
                            } />
                        <Chip
                            sx={{
                                cursor: 'pointer'
                            }}
                            size="large"
                            variant={"outlined"}
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                >
                                    {subcategory}
                                </Typography>
                            } />
                    </Stack>
                }
            />
            <CardContent>
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap', justifyContent: "start",
                        alignItems: "start"
                    }}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <CurrencyRupeeOutlined sx={{ fontSize: "15px" }} />
                        </ListItemIcon>
                        <Typography
                            variant="body2"
                            fontFamily={'Raleway'}
                            fontWeight={'bold'}
                            fontSize={13}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            <span
                                style={{
                                    textDecorationLine: 'line-through'
                                }}
                            >
                                {
                                    mrp
                                }
                            </span>&ensp;
                            {
                                price
                            }
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate('/location', { state: { location: [latitude, longitude] } })}
                    >
                        <ListItemIcon>
                            <ShareLocationOutlined sx={{ fontSize: "15px" }} />
                        </ListItemIcon>
                        <Typography
                            variant="body2"
                            fontFamily={'Raleway'}
                            fontWeight={'bold'}
                            fontSize={13}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            {
                                longitude === null ? `${longitude}` : longitude.toFixed(2)
                            }
                            &ensp;
                            {
                                latitude === null ? `${latitude}` : latitude.toFixed(2)
                            }
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <LocationCityOutlined sx={{ fontSize: "15px" }} />
                        </ListItemIcon>
                        <Typography
                            variant="body2"
                            fontFamily={'Raleway'}
                            fontWeight={'bold'}
                            fontSize={13}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            {
                                shop
                            }
                        </Typography>
                    </MenuItem>
                </Stack>
            </CardContent>
            <CardContent
                sx={{
                    borderTop: '1px solid #333B4D',
                    py: 1,
                    textWrap: 'wrap'
                }}
            >
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap', justifyContent: "start",
                        alignItems: "start"
                    }}
                >
                    <Typography
                        variant="body2"
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                        fontSize={12}
                        sx={{ color: 'text.primary' }}
                    >
                        Description
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        textWrap: 'balance'
                    }}
                >
                    <p
                        style={{
                            fontFamily: 'Raleway',
                            fontWeight: 'bold',
                            fontSize: 14
                        }}
                    >
                        {
                            description
                        }
                    </p>
                </Box>
            </CardContent>
            <CardContent
                sx={{
                    borderTop: '1px solid #333B4D',
                    py: 1,
                    display: 'flex',
                    justifyContent: 'end'
                }}
            >
                <QRCode
                    size={100}
                    style={{ height: "auto", maxWidth: 80, width: 80 }}
                    value={"https:mui.com"}
                    viewBox={`0 0 100 100`}
                    level="L"
                />
            </CardContent>
        </Card>
    );
}
