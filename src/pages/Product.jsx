import { Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetProduct } from "../reducers/slices/seller";
import Carousel from 'react-material-ui-carousel'
import ProductCard from "./ProductCard";
import { WhatsApp } from "@mui/icons-material";
import Copyright from "./CopyRight";

function Item({ path }) {
    console.log(path)
    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <img
                src={path}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundRepeat: 'no-repeat',
                }}
                alt={path}
                loading="lazy"
            />
        </Paper>
    )
}

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [file, setFiles] = useState({
        title: '',
        description: '',
        category: "",
        subcategory: '',
        stock: 0,
        mrp: 0,
        discount: 0,
        discountedPrice: 0,
        productId: '',
        shop: "",
        longitude: 0,
        latitude: 0,
        error: 0,
        images: []
    })

    async function getProductData(id) {
        try {
            const { payload } = await dispatch(GetProduct(id))
            const paths = payload.result.map(item => `http://localhost:8080/${item.path}`)
            const keys = [
                'title',
                'description',
                'category',
                'subcategory',
                'stock',
                'mrp',
                'discount',
                'discountedPrice',
                'productId',
                'shop'
            ]
            let obj = {}
            keys.forEach(key => {
                obj[key] = payload.result[0][key]
            })
            console.log(payload)
            obj['longitude'] = payload.location.longitude
            obj['latitude'] = payload.location.latitude
            obj['error'] = payload.location.error

            console.log(obj)
            setFiles({
                ...obj,
                images: paths
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (id !== null) {
            getProductData(id)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Grid
            container
            p={2}
            justifyContent={'center'}
        >
            <Grid
                container
                maxWidth={'lg'}
                component={Paper}
                elevation={0}
                p={3}
                flexGrow={1}
                rowGap={2}
                justifyContent={'space-between'}
                sx={{
                    backgroundColor: '#F1F1F1',
                    height: '70vh'
                }}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'end'}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        disableElevation
                        color="error"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                            px: 2
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>&ensp;
                    <Button
                        variant="contained"
                        disableElevation
                        size="small"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                            px: 2
                        }}
                        href={`https://wa.me/7024899020`}
                        startIcon={<WhatsApp />}
                    >
                        Contact
                    </Button>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={0}
                    xs={12}
                    lg={5}
                >
                    <Carousel>
                        {
                            file.images.map((item, i) => <Item key={i} path={item} />)
                        }
                    </Carousel>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={7}
                    component={Paper}
                    elevation={0}
                >
                    <ProductCard
                        title={file.title}
                        description={file.description}
                        mrp={file.mrp}
                        price={file.discountedPrice}
                        shop={file.shop}
                        category={file.category}
                        subcategory={file.subcategory}
                        stock={file.stock}
                        longitude={file.longitude}
                        latitude={file.latitude}
                        error={file.error}
                    />
                </Grid>
            </Grid >
            <Copyright />
        </Grid>
    )
}