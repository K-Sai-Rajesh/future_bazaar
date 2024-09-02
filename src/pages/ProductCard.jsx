import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Grid } from '@mui/material';
import { CurrencyRupeeOutlined, FolderCopyOutlined, LocationCityOutlined, ShareLocationOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ title, description, mrp, price, shop, category, subcategory, stock, longitude, latitude, error }) {
    const navigate = useNavigate()
    return (
        <Card elevation={0}>
            <CardHeader
                action={
                    <>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </>
                }
                title={
                    <Typography
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                    >
                        {
                            title
                        }
                    </Typography>
                }
                subheader={
                    <Box
                        display={'flex'}
                        justifyContent={'space-around'}
                        alignItems={'center'}
                    >
                        <Typography
                            fontFamily={'Raleway'}
                            fontWeight={'bolder'}
                            fontSize={10}
                        >
                            {
                                category
                            }
                        </Typography>
                        <Typography
                            fontFamily={'Raleway'}
                            fontWeight={'bolder'}
                            fontSize={10}
                        >
                            {
                                subcategory
                            }
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <Grid
                    container
                    columnSpacing={2}
                    rowGap={2}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={2}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={15}
                                sx={{
                                    color: 'text.secondary',
                                    // textDecorationLine: 'line-through'
                                }}
                            >
                                Price
                            </Typography>
                        </Box>
                        <Box
                            display={'flex'}
                            // justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <CurrencyRupeeOutlined
                                sx={{
                                    color: '#8921C7',
                                    fontSize: '15px'
                                }}
                            />
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={13}
                                sx={{
                                    color: 'text.secondary',
                                    textDecorationLine: 'line-through'
                                }}
                            >
                                {
                                    mrp
                                }
                            </Typography>&ensp;
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={15}
                                color="#742D2E"
                            >
                                {
                                    price
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={15}
                                sx={{ color: 'text.secondary' }}
                            >
                                stock
                            </Typography>
                        </Box>
                        <Box
                            display={'flex'}
                            // justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <FolderCopyOutlined
                                sx={{
                                    fontSize: '20px',
                                    color: '#8921C7'
                                }}
                            />&ensp;
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={12}
                                sx={{ color: 'text.secondary' }}
                            >
                                {
                                    stock
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        sx={{
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/location', { state: { location: [latitude, longitude], error } })}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={15}
                                sx={{ color: 'text.secondary' }}
                            >
                                Location
                            </Typography>
                        </Box>
                        <Box
                            display={'flex'}
                            // justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <ShareLocationOutlined
                                sx={{
                                    color: '#8921C7',
                                    fontSize: '20px'
                                }}
                            />&ensp;
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={12}
                                sx={{ color: 'text.secondary' }}
                            >
                                {
                                    longitude === null ? longitude : longitude.toFixed(2)
                                },&ensp;
                                {
                                    latitude === null ? latitude : latitude.toFixed(2)
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={15}
                                sx={{ color: 'text.secondary' }}
                            >
                                shop
                            </Typography>
                        </Box>
                        <Box
                            display={'flex'}
                            // justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <LocationCityOutlined
                                sx={{
                                    color: '#8921C7',
                                    fontSize: '20px'
                                }}
                            />&ensp;
                            <Typography
                                variant="body2"
                                fontFamily={'Raleway'}
                                fontWeight={'bold'}
                                fontSize={12}
                                sx={{ color: 'text.secondary' }}
                            >
                                {
                                    shop
                                }
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <Typography
                    variant="body2"
                    fontFamily={'Raleway'}
                    fontWeight={'bold'}
                    fontSize={12}
                    sx={{ color: 'text.primary' }}
                >
                    Description
                </Typography>
                <Typography
                    variant="body2"
                    fontFamily={'Raleway'}
                    fontWeight={'bold'}
                    fontSize={14}
                    sx={{ color: 'text.secondary' }}
                >
                    {
                        description
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}
