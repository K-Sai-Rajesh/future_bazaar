import {
    Map, Marker
} from "pigeon-maps";
import "./styles.css";
import { Box, Button } from "@mui/material";
import Copyright from "./CopyRight";
import { useLocation, useNavigate } from "react-router-dom";

export default function PeerLocation() {
    const { state } = useLocation()
    const navigate = useNavigate()

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            height={'80vh'}
        >
            <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{
                    textTransform: 'none',
                    borderRadius: 15,
                    fontSize: '13px',
                    fontFamily: 'Raleway',
                    fontWeight: '600',
                    px: 2,
                    m: 1
                }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            <Map
                height={"88vh"}
                width={window.innerWidth - 40}
                defaultCenter={state.location}
                defaultZoom={15}
            >
                <Marker width={50} anchor={state.location} />
            </Map>
            <Copyright />
        </Box >
    );
}
