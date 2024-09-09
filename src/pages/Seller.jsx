import { Avatar, Badge, Box, Card, CardContent, Chip, createTheme, Grid, IconButton, Paper, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProductsBySellerId, GetSeller } from "../reducers/slices/seller";
import getBlogTheme from "./Landing/theme/getBlogTheme";
import { KeyboardDoubleArrowRightOutlined } from "@mui/icons-material";
import { config } from "../helpers/config";

export default function Seller() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const blogTheme = createTheme(getBlogTheme('light'));
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState(null)

    async function getSeller() {
        try {
            const { payload } = await dispatch(GetSeller(id))
            if (payload.result) {
                setUser(payload.result[0])
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function getProductsBySellerID() {
        try {
            const { payload } = await dispatch(GetProductsBySellerId(id))
            if (payload?.result) {
                // const groupedObjects = payload?.result.reduce((result, obj) => {
                //     (result[obj.category] = result[obj.category] || []).push(obj);
                //     return result;
                // }, {});
                console.log(payload?.result)
                // console.log(payload?.result?.map(item => {
                //     return {
                //         ...Object.values(item)[0][0],
                //         pics: Object.values(item)[0].map(item => item.path)
                //     }
                // }))
                // setProducts(payload?.result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        try {
            getSeller();
            getProductsBySellerID()
        } catch (e) {
            console.error(e)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <ThemeProvider theme={blogTheme}>
            <Grid
                container
                p={2}
                rowGap={4}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Badge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        overlap="circular"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={user === null ? "" : `http://localhost:8080/${user.propic}`}
                            sx={{
                                width: 256,
                                height: 256,
                                backgroundColor: '#fff'
                            }}
                        />
                    </Badge>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    component={Paper}
                    display={'flex'}
                    rowGap={1}
                    flexDirection={'column'}
                    p={1}
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
                            ['firstname', 'lastname', 'shopName', 'shopPhoneNumber', 'shopStartTime', 'shopEndTime'].map((head, idx) => (
                                <Box
                                    sx={{ width: '250px' }}
                                    key={idx}
                                >

                                    <TextField
                                        id={`${head.label}-${idx}`}
                                        hiddenLabel
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        value={user === null ? "" : user[head]}
                                        aria-label="Enter your email address"
                                        placeholder="Your email address"
                                        slotProps={{
                                            htmlInput: {
                                                autoComplete: 'off',
                                                'aria-label': 'Enter your email address',
                                            },
                                        }}
                                        sx={{ width: '250px', fontFamily: 'Raleway' }}
                                    />
                                </Box>
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    rowGap={1}
                    flexDirection={'column'}
                    p={1}
                >
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap',
                            justifyContent: 'end',
                            alignItems: "center",
                        }}
                    >
                        {
                            products !== null && Object.keys(products).map((catergory, idx) => {
                                return (
                                    <Chip
                                        key={idx}
                                        sx={{
                                            cursor: 'pointer'
                                        }}
                                        // onClick={() => navigate(`${link.link}`)}
                                        size="large"
                                        // variant={path === link.link ? "contained" : 'outlined'}  
                                        color='primary'
                                        label={
                                            <Typography
                                                fontFamily={"Raleway"}
                                                fontSize={'12px'}
                                                fontWeight={'bold'}
                                                overflow={'auto'}
                                                textOverflow={'ellipsis'}
                                                textTransform={'capitalize'}
                                            // color={path === link.link ? "#fff" : "#767676"}
                                            >
                                                {catergory}
                                            </Typography>
                                        } />
                                )
                            })
                        }
                    </Stack>
                </Grid>
                {
                    products !== null &&
                    Object.keys(products).map((key, idx) => {
                        return (
                            <Grid
                                key={idx}
                                item
                                xs={12}
                            >
                                <Box
                                    display={'flex'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'15px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                        textTransform={'capitalize'}
                                    // color={path === link.link ? "#fff" : "#767676"}
                                    >
                                        {key}
                                    </Typography>
                                    <IconButton>
                                        <KeyboardDoubleArrowRightOutlined />
                                    </IconButton>
                                </Box>
                                <Stack
                                    spacing={{ xs: 1, sm: 2 }}
                                    direction="row"
                                    useFlexGap
                                    sx={{
                                        flexWrap: 'wrap',
                                        alignItems: "center",
                                    }}
                                >
                                    {
                                        products[key].map((product, idx) => (
                                            <Card sx={{ maxWidth: 345 }} key={idx}>
                                                <img
                                                    style={{ height: 140 }}
                                                    src={`${config.BASE_URL}/${product.path}`}
                                                    alt={product.title}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {product.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                                        species, ranging across all continents except Antarctica
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }
                                </Stack>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </ThemeProvider>
    )
}