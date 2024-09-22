import { Avatar, Box, Grid, InputLabel, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Category, GetMainProducts, GetSellers } from "../../../reducers/slices/seller";
import Carousel from "react-material-ui-carousel";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { ShareLocationOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Item({ path }) {
    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <img
                src={path}
                style={{
                    width: '100%',
                    height: 400,
                    backgroundRepeat: 'no-repeat',
                }}
                alt={path}
                loading="lazy"
            />
        </Paper>
    )
}

export default function Main() {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [sellers, setSellers] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const file = [
        "https://images.ctfassets.net/wowgx05xsdrr/FuyuOgIBjnHyehF0IR8zY/8109414c34065431d14886a5aad2f60a/Article-Header_Ecommerce_Website.jpg?fm=webp&w=3840&q=75",
        "https://cms.rootstack.com/sites/default/files/inline-images/Capture%20d%E2%80%99%C3%A9cran%202022-07-25%20112920.jpg",
        "https://5.imimg.com/data5/SELLER/Default/2021/7/YM/YX/PA/134753600/ecommerce-website-in-patna.jpg"
    ]
    async function gecategories() {
        try {
            const { payload } = await dispatch(Category())
            setCategories(payload)
        } catch (e) {
            console.error(e)
        }
    }
    async function getsellers() {
        try {
            const { payload } = await dispatch(GetSellers())
            setSellers(payload?.result)
        } catch (e) {
            console.error(e)
        }
    }
    async function getproducts() {
        try {
            const { payload } = await dispatch(GetMainProducts())
            const groupedObjects = payload?.result.reduce((result, obj) => {
                (result[obj.title] = result[obj.title] || []).push(obj);
                return result;
            }, {});

            setProducts(Object.values(groupedObjects).map(product => ({ ...product[0], img: product.map(img => `http://localhost:8080/${img.path}`) })))

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        gecategories()
        getsellers()
        getproducts()
    }, [])

    return (
        <>
            <Grid
                item
                xs={12}
            >
                <Carousel>
                    {
                        file.map((item, i) => <Item key={i} path={item} />)
                    }
                </Carousel>
            </Grid>
            <Grid
                item
                xs={12}
                px={3}
            >
                <Typography
                    fontFamily={"Raleway"}
                    fontSize={'18px'}
                    fontWeight={'bold'}
                    overflow={'auto'}
                    textOverflow={'ellipsis'}
                    textTransform={'capitalize'}
                    sx={{
                        textDecorationLine: 'underline'
                    }}
                    color={'#767676'}
                >
                    Our Categories
                </Typography>
                <Stack
                    direction={{ xs: 'row' }}
                    columnGap={5}
                    sx={{
                        whiteSpace: "normal",
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {
                        categories?.map((floor, idx) => (
                            <Box
                                key={idx}
                                py={4.5}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <InputLabel
                                    htmlFor={"idx"}
                                    sx={{ fontFamily: "Raleway", fontWeight: "Bold" }}
                                >
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'13px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                        textTransform={'capitalize'}
                                        color={'#767676'}
                                    >
                                        {floor?.title}
                                    </Typography>
                                </InputLabel>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`http://localhost:8080/${floor?.url}`}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        backgroundColor: '#fff'
                                    }}
                                />
                            </Box>
                        ))
                    }
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                px={3}
            >
                <Typography
                    fontFamily={"Raleway"}
                    fontSize={'18px'}
                    fontWeight={'bold'}
                    overflow={'auto'}
                    textOverflow={'ellipsis'}
                    textTransform={'capitalize'}
                    sx={{
                        textDecorationLine: 'underline'
                    }}
                    color={'#767676'}
                >
                    Our Partners
                </Typography>&nbsp;
                <Stack
                    direction={{ xs: 'row' }}
                    columnGap={1}
                    rowGap={1}
                    sx={{
                        whiteSpace: "normal",
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        sellers?.map((seller, idx) => (<RecipeReviewCard navigate={navigate} seller={seller} key={idx} />))
                    }
                </Stack>
            </Grid>
        </>
    )
}

function RecipeReviewCard({ seller, navigate }) {
    console.log(seller)
    return (
        <Card
            sx={{
                width: { xs: 345, sm: 300 },
                height: { xs: 337, sm: 300 },
                display: 'flex',
                flexDirection: 'column',
                rowGap: 1
            }}
        >
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                action={
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'12px'}
                        fontWeight={'bold'}
                        overflow={'auto'}
                        textOverflow={'ellipsis'}
                        textTransform={'capitalize'}
                        color={'secondary'}
                    >
                        {seller?.category}
                    </Typography>
                }
                title={
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'18px'}
                        fontWeight={'bold'}
                        overflow={'auto'}
                        textOverflow={'ellipsis'}
                        textTransform={'capitalize'}
                        color={'#767676'}
                    >
                        {seller?.shopName}
                    </Typography>
                }
            // subheader={
            //     <IconButton aria-label="settings" sx={{ alignSelf: 'end', border: 'none' }}>
            //         <ShareLocationOutlined />
            //     </IconButton>
            // }
            />
            <CardMedia
                component="img"
                image={seller?.propic === null ? "https://img.freepik.com/free-vector/cost-saving-online-payment-money-transfer-financial-savings_335657-3105.jpg" : `http://localhost:8080/${seller?.propic}`} // === null ? "https://img.freepik.com/free-vector/shopping-store-icon-isolated-illustration_18591-82228.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid" : `http://localhost:8080/${seller?.propic}`}
                alt="Paella dish"
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'end', alignSelf: 'end' }}>
                <IconButton onClick={() => navigate('location', { state: { location: [seller?.latitude, seller?.longitude] } })} aria-label="settings" sx={{ border: 'none', alignSelf: 'end' }}>
                    <ShareLocationOutlined />
                </IconButton>
                <IconButton onClick={() => navigate(`seller/${seller?.id}`, { state: { location: [seller?.latitude, seller?.longitude] } })} aria-label="settings" sx={{ border: 'none', alignSelf: 'end' }}>
                    <VisibilityOutlined />
                </IconButton>
            </CardContent>
        </Card>
    );
}