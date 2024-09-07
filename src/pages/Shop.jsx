import { Grid, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetProducts, GetSellersAttributes } from "../reducers/slices/seller";
import EnhancedTable from "../common/Table";
import { Gauge, GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from "@mui/x-charts";
import QRCode from "react-qr-code";

export default function Shop() {
    const dispatch = useDispatch()
    const [storage, setStorage] = useState(0)
    const [products, setProducts] = useState([])
    const [views, setViews] = useState({
        profile: 0,
        product: 0
    })
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

    function GaugePointer() {
        const { valueAngle, outerRadius, cx, cy } = useGaugeState();

        if (valueAngle === null) {
            // No value to display
            return null;
        }

        const target = {
            x: cx + outerRadius * Math.sin(valueAngle),
            y: cy - outerRadius * Math.cos(valueAngle),
        };
        return (
            <g>
                <circle cx={cx} cy={cy} r={5} fill="red" />
                <path
                    d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                    stroke="red"
                    strokeWidth={3}
                />
            </g>
        );
    }
    // eslint-disable-next-line
    async function getStorage() {
        try {
            const { payload } = await dispatch(GetProducts())
            if (payload?.result) {
                const sum = (payload?.result.map(res => res.size).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 1024) / 1024;
                const groupedObjects = payload?.result.reduce((result, obj) => {
                    (result[obj.title] = result[obj.title] || []).push(obj);
                    return result;
                }, {});
                setStorage(sum)
                setProducts(Object.values(groupedObjects).map(obj => {
                    return obj[0]
                }))
            }
        } catch (e) {
            console.error(e)
        }
    }

    // eslint-disable-next-line
    async function getSellersAttributes() {
        try {
            const { payload } = await dispatch(GetSellersAttributes())
            if (payload?.result) {
                setViews(payload?.result)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getStorage() // eslint-disable-next-line
        getSellersAttributes() // eslint-disable-next-line
    }, [])

    return (
        <Grid
            container
            maxWidth={'lg'}
            rowGap={2}
            justifyContent={'space-between'}
            p={1}
            sx={{
                backgroundColor: '#F1F1F1'
            }}
        >
            <Grid
                item
                xs={12}
                sm={3.9}
                md={3.9}
                p={2}
                elevation={0}
                component={Paper}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <QRCode
                    size={100}
                    style={{ height: "auto", maxWidth: 150, width: 150 }}
                    value={"https:mui.com"}
                    viewBox={`0 0 100 100`}
                    level="Q"
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={3.9}
                md={3.9}
                p={2}
                elevation={0}
                component={Paper}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    Product Limit
                </Typography>
                <GaugeContainer
                    width={150}
                    height={150}
                    startAngle={-110}
                    endAngle={110}
                    value={products.length}
                    valueMax={20}
                >
                    <GaugeReferenceArc />
                    <GaugeValueArc />
                    <GaugePointer />
                </GaugeContainer>
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                    color={'#8921C7'}
                >
                    {products.length}/20
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={3.9}
                md={3.9}
                p={2}
                elevation={0}
                component={Paper}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    Storage (MB)
                </Typography>
                <Gauge
                    width={150}
                    height={150}
                    value={parseFloat(storage.toFixed(2))}
                    valueMax={200}
                />
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                    color={'#8921C7'}
                >
                    200
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={5.9}
                p={2}
                elevation={0}
                component={Paper}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    Product Views
                </Typography>
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={30}
                    fontWeight={'bold'}
                    color={'#1976D2'}
                >
                    {
                        views.product
                    }
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={5.9}
                p={2}
                elevation={0}
                component={Paper}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={20}
                    fontWeight={'bold'}
                >
                    Profile Views
                </Typography>
                <Typography
                    fontFamily={'Raleway'}
                    fontSize={30}
                    color={'#1976D2'}
                    fontWeight={'bold'}
                >
                    {
                        views.profile
                    }
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <EnhancedTable
                    rows={products}
                    headCells={headCell}
                    status={"Product"}
                    icon={false}
                    actions={false}
                />
            </Grid>
        </Grid>
    )
}