import { Card, CardContent, CardHeader, Chip, Grid, ListItemIcon, MenuItem, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GetSellersProductById } from "../reducers/slices/seller";
import { CurrencyRupeeOutlined, LocationCityOutlined } from "@mui/icons-material";

export default function SellerProducts() {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const [arrOfProducts, setArrOfProducts] = useState([])

    async function GetSellersProduct() {
        try {
            const { payload } = await dispatch(GetSellersProductById({ id: state?.id, category: state?.product }))
            if (payload.result) {
                const groupedCategories = payload?.result.reduce((result, obj) => {
                    (result[obj.title] = result[obj.title] || []).push(obj);
                    return result;
                }, {});
                const arr = Object.keys(groupedCategories).map(key => {
                    const pics = groupedCategories[key].map(product => `http://locahost:8080/${product.path}`)
                    return {
                        ...groupedCategories[key][0],
                        pics
                    }
                })
                setArrOfProducts(arr)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        GetSellersProduct()
    }, [])

    return (
        <Grid
            container
        >
            <Grid
                item
                xs={12}
            >
                <Stack
                    spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap', justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {
                        arrOfProducts.map(product => (
                            <Card
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '200px'
                                }}
                            >
                                <CardHeader
                                    action={
                                        <>
                                            {/* <Stack
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
                                            </Stack> */}
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
                                                {product.title}
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
                                                        {product.category}
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
                                                        {product.subcategory}
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
                                                        product.mrp
                                                    }
                                                </span>&ensp;
                                                {
                                                    product.discountedPrice
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
                                                    product.shop
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
                                                product.description
                                            }
                                        </p>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}