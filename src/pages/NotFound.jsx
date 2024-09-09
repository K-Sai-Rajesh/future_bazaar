import { Grid, Typography } from "@mui/material";

export default function NotFound() {

    return (
        <Grid
            container
        >
            <Grid
                item
            >
                <Typography
                    fontFamily={"Raleway"}
                    fontSize={'12px'}
                    fontWeight={'bold'}
                    overflow={'auto'}
                    textOverflow={'ellipsis'}
                    color={"#767676"}
                >
                    Page Not Found !
                </Typography>
            </Grid>
        </Grid >
    )
}