import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Grid } from '@mui/material';
import { CurrencyRupeeOutlined, FolderCopyOutlined, ShareLocationOutlined } from '@mui/icons-material';

export default function ProductCard({ title, description, mrp, price, shop, category, subcategory, stock }) {

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
                >
                    <Grid
                        item
                        xs={12}
                        md={4}
                        lg={2}
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
                        md={4}
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
                        md={4}
                        lg={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'end'}
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
