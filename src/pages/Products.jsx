import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EnhancedTable from "../common/Table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProducts } from "../reducers/slices/seller";

export default function Products() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [rows, setRows] = useState([])
    const headCell = [
        {
            id: 'path',
            label: 'Product',
            minWidth: 100
        },
        {
            id: 'title',
            label: 'Name',
            minWidth: 100
        },
        {
            id: 'stock',
            label: 'Stock',
            minWidth: 100
        },
        {
            id: 'mrp',
            label: 'MRP',
            minWidth: 100
        },
        {
            id: 'discount',
            label: 'Discount ( % )',
            minWidth: 100
        },
        {
            id: 'discountedPrice',
            label: 'Discounted Price',
            minWidth: 100
        }
    ]

    // eslint-disable-next-line
    async function getProducts() {
        try {
            const { payload } = await dispatch(GetProducts())
            if (payload?.result) {
                const groupedObjects = payload?.result.reduce((result, obj) => {
                    (result[obj.title] = result[obj.title] || []).push(obj);
                    return result;
                }, {});
                // console.log(groupedObjects)
                setRows(Object.values(groupedObjects).map(obj => {
                    return obj[0]
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])

    return (
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
                backgroundColor: '#F1F1F1'
            }}
        >
            <Grid
                item
                xs={12}
                sm={6}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={15}
                    fontWeight={'bold'}
                >
                    Products
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
            >
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: 'none',
                        borderRadius: 15,
                        fontSize: '13px',
                        fontFamily: 'Raleway',
                        fontWeight: '600',
                        px: 2
                    }}
                    onClick={() => navigate('/dashboard/add product')}
                >
                    Add Product
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <EnhancedTable
                    rows={rows}
                    headCells={headCell}
                    status={"Product"}
                    icon={false}
                    actions={true}
                />
            </Grid>
        </Grid>
    )
}