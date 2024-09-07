import { Grid, Link, Typography } from "@mui/material";

export default function Copyright(props) {
    return (
        <Grid
            container
            alignItems={'center'}
            sx={{
                backgroundColor: '#222222',
                position: 'fixed',
                bottom: 0,
                height: '30px',
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                zIndex: 100
            }}
        >
            <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'end'}
                alignItems={'center'}
            >
                <Typography
                    variant="body2"
                    color="#fff"
                    {...props}
                    fontFamily={'Raleway'}
                    fontWeight={'bold'}
                    fontSize={'12px'}
                >
                    {'Copyright © '}&ensp;
                    <Link
                        color="inherit"
                        href="https://mui.com/"
                        sx={{
                            fontFamily: 'Raleway'
                        }}
                    >
                        https://future-bazaar.com
                    </Link>{' '}&ensp;
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
        </Grid>
    );
}