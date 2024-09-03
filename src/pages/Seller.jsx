import { Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Copyright from "./CopyRight";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetSeller } from "../reducers/slices/seller";

export default function Seller() {
    const { id } = useParams()
    const dispatch = useDispatch()
    console.log(id)

    async function getSeller() {
        try {
            const payload = await dispatch(GetSeller(id))
            if (payload.result) {
                console.log(payload)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        try {
            getSeller()
        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <Grid
            container
            p={2}
            justifyContent={'center'}
        >
            <Grid
                container
                p={1}
                component={Paper}
                elevation={0}
                sx={{
                    backgroundColor: '#F1F1F1'
                }}
                maxWidth={'lg'}
            >
                <Grid
                    xs={12}
                >
                    <Typography>
                        Seller
                    </Typography>
                </Grid>
            </Grid>
            <Copyright />
        </Grid>
    )
}