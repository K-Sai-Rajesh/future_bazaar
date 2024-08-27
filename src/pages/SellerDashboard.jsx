import { Grid, Paper, Typography } from "@mui/material";
import CustomInputField from "../common/CustomInputField";

export default function SellerDashboard() {

    return (
        <>
            <Grid
                container
                flexGrow={1}
                // columnGap={1}
                rowGap={1}
                justifyContent={'space-between'}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        fontFamily={'Raleway'}
                        fontSize={15}
                        fontWeight={'bold'}
                    >
                        Add Product
                    </Typography>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={9}
                    xs={12}
                    lg={6.9}
                    p={2}
                >
                    {/* <CustomInputField
                        required
                        fullWidth
                        id="product_title"
                        label="Product"
                        name="product_title"
                        autoComplete="product"
                        size='small'
                        // value={register?.values?.email}
                        // onChange={register.handleChange}
                        // error={
                        //     register.errors.email && register.touched.email
                        // }
                        // errormessage={
                        //     register.errors.email && register.touched.email
                        //         ? register.errors.email
                        //         : ""
                        // }
                        sx={{
                            fontFamily: 'Raleway',
                            fontWeight: 'bold !important'
                        }}
                    /><br />
                    <CustomInputField
                        required
                        fullWidth
                        id="product_description"
                        label="Product Description"
                        name="product_description"
                        autoComplete="description"
                        size='small'
                        multiline={true}
                        rows={5}
                        // value={register?.values?.email}
                        // onChange={register.handleChange}
                        // error={
                        //     register.errors.email && register.touched.email
                        // }
                        // errormessage={
                        //     register.errors.email && register.touched.email
                        //         ? register.errors.email
                        //         : ""
                        // }
                        sx={{
                            fontFamily: 'Raleway',
                            fontWeight: 'bold !important'
                        }}
                    /> */}
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={9}
                    xs={12}
                    lg={5}
                    p={2}
                >
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={9}
                    xs={12}
                    lg={6.7}
                    p={2}
                >
                </Grid>
            </Grid>
        </>
    )
}