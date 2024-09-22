import { Avatar, Badge, Box, Card, CardContent, CardHeader, Chip, createTheme, Grid, IconButton, ListItemIcon, MenuItem, Paper, Stack, ThemeProvider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProductsBySellerId, GetSeller, SubCategory } from "../reducers/slices/seller";
import getBlogTheme from "./Landing/theme/getBlogTheme";
import { CurrencyRupeeOutlined, FavoriteBorderOutlined, ShareLocationOutlined } from "@mui/icons-material";
import { config } from "../helpers/config";

export default function Seller() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blogTheme = createTheme(getBlogTheme('light'));
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [allSelected, setAllSelected] = useState(true)

    async function getSeller() {
        try {
            const { payload } = await dispatch(GetSeller(id))
            if (payload.result) {
                getSubCategories(payload?.result?.category)
                setUser(payload.result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function getSubCategories(category) {
        try {
            const { payload } = await dispatch(SubCategory(category))
            if (payload)
                setSubCategory(payload ? payload.map(item => ({ sub: item.subcategory, isSelected: false })) : [])
        } catch (e) {
            console.error(e)
        }
    }

    async function getProductsBySellerID(sub) {
        try {
            const { payload } = await dispatch(GetProductsBySellerId({ id, sub }))
            if (payload?.result) {
                const segregated = Object.values(payload?.result)[0].reduce((result, obj) => {
                    (result[obj.title] = result[obj.title] || []).push(obj);
                    return result;
                }, {})
                setProducts(Object.keys(segregated).map(key => ({
                    picList: segregated[key].map(product => product.path),
                    ...segregated[key][0]
                })))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        try {
            getSeller();
            getProductsBySellerID('all')
        } catch (e) {
            console.error(e)
        }
        // eslint-disable-next-line
    }, [])

    async function SelectStore(sub, key) {
        let filteredStore = subCategory.map((filter, id) => {
            if (id === key) return { ...filter, isSelected: true }
            else return { ...filter, isSelected: false }
        });
        getProductsBySellerID(sub.sub)
        setAllSelected(false)
        setSubCategory(filteredStore)
    }

    return (
        <ThemeProvider theme={blogTheme}>
            <Grid
                container
                justifyContent={'center'}
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
                    justifyContent={'center'}
                    alignItems={'center'}
                    p={1}
                >
                    <Card sx={{ width: '100%', height: '100%', border: 'none' }} elevation={0}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, fontFamily: "Raleway" }}>
                                {user === null ? "" : `${user.firstname} ${user.lastname}`}
                            </Typography>
                            <Typography variant="h5" component="div" fontFamily="Raleway">
                                {user === null ? "" : user.shopName}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }} fontFamily="Raleway">
                                {user === null ? "" : user.shopPhoneNumber}
                            </Typography>
                        </CardContent>
                        <CardContent
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="h5" component="div" fontFamily="Raleway">
                                Shop Timings
                            </Typography>
                            <IconButton
                                onClick={() => navigate('/location', { state: { location: [user.latitude, user.longitude] } })}
                            >
                                <ShareLocationOutlined />
                            </IconButton>
                        </CardContent>
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="h5" component="div" fontFamily="Raleway">
                                {user === null ? "" : user.shopStartTime}
                            </Typography>&emsp;&emsp;
                            <Typography variant="h5" component="div" fontFamily="Raleway">
                                {user === null ? "" : user.shopEndTime}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    rowGap={1}
                    flexDirection={'column'}
                    // p={1}
                >
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'no-wrap',
                            alignItems: "center",
                        }}
                    >
                        <Chip
                            sx={{
                                cursor: 'pointer'
                            }}
                            size="large"
                            color='primary'
                            variant="outlined"
                            disabled
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                    color={"#222"}
                                >
                                    {user === null ? "" : user.category}
                                </Typography>
                            } />
                    </Stack>
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'no-wrap',
                            alignItems: "center",
                        }}
                    >
                        <Chip
                            sx={{
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setAllSelected(true)
                                getProductsBySellerID('all')
                                setSubCategory(subCategory.map(sub => ({ ...sub, isSelected: false })))
                            }}
                            size="large"
                            variant={allSelected ? "contained" : 'outlined'}
                            color='primary'
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                >
                                    all
                                </Typography>
                            } />
                        {
                            subCategory.map((sub, key) => (
                                <Chip
                                    key={key}
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => SelectStore(sub, key)}
                                    size="large"
                                    variant={sub.isSelected ? "contained" : 'outlined'}
                                    color='primary'
                                    label={
                                        <Typography
                                            fontFamily={"Raleway"}
                                            fontSize={'12px'}
                                            fontWeight={'bold'}
                                            overflow={'auto'}
                                            textOverflow={'ellipsis'}
                                            textTransform={'capitalize'}
                                        >
                                            {sub.sub}
                                        </Typography>
                                    } />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Stack
                        spacing={{ xs: 1 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap', justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {
                            products.map((head, idx) => (
                                <Box
                                    sx={{ width: '160px' }}
                                    display={'flex'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    key={idx}
                                >
                                    <Card sx={{ width: '100%' }}>
                                        <CardHeader
                                            title={head.title}
                                            action={
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteBorderOutlined />
                                                </IconButton>
                                            }
                                        /><br />
                                        <img
                                            src={`${config.BASE_URL}/${head.path}`}
                                            style={{
                                                width: '100%'
                                            }}
                                            alt="Paella dish"
                                        />
                                        <CardContent sx={{ py: 2 }}>
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
                                                                head.mrp
                                                            }
                                                        </span>&ensp;
                                                        {
                                                            head.discountedPrice
                                                        }
                                                    </Typography>
                                                </MenuItem>
                                            </Stack>
                                        </CardContent>
                                        {/* <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'end' }}>
                                            <QRCode
                                                size={100}
                                                style={{ height: "auto", maxWidth: 80, width: 80 }}
                                                value={"https:mui.com"}
                                                viewBox={`0 0 100 100`}
                                                level="L"
                                            />
                                        </CardActions> */}
                                    </Card>
                                </Box>
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}