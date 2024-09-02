import { Grid, Paper } from "@mui/material";
import PieArcLabel from "../graphs/MuiPieChart";

export default function Shop() {

    return (
        <Grid
            container
        >
            <Grid
                item
                component={Paper}
                sx={{
                    backgroundColor:''
                }}
                xs={12}
                md={6}
                id='pie'
            >
                <PieArcLabel />
            </Grid>
        </Grid>
    )
}