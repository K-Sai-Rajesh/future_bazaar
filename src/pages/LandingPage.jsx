import { Grid, Typography } from "@mui/material";

export default function LandingPage() {

    return (
        <Grid
            container
        >
            <Grid
                item
                xs={12}
                lg={7}
            >
                <Typography
                    fontFamily={'Raleway'}
                    fontSize='14px'
                >
                    Work That We Provide for Our Customers
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                lg={5}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <img
                    src="https://5.imimg.com/data5/SELLER/Default/2021/6/TW/EU/BO/85733008/prefabricated-coffee-shop-container-1000x1000.jpg"
                    alt="https://5.imimg.com/data5/SELLER/Default/2021/6/TW/EU/BO/85733008/prefabricated-coffee-shop-container-1000x1000.jpg"
                    style={{
                        height: '400px'
                    }}
                />
            </Grid>
        </Grid>
    )
}