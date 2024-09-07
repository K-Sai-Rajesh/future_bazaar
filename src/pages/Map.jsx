import {
    Map, Marker
} from "pigeon-maps";
import "./styles.css";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function MapLocation() {
    // eslint-disable-next-line
    const { state } = useLocation()
    // eslint-disable-next-line
    const [location, setLocation] = useState(state)
    const navigate = useNavigate()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setLocation(position.coords)
            }, function (e) {
                console.error(e)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,            // Timeout in milliseconds
                maximumAge: 0
            })
        }
    }, [])
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Button
                variant="outlined"
                size="small"
                color="success"
                sx={{
                    textTransform: 'none',
                    borderRadius: 15,
                    fontSize: '13px',
                    fontFamily: 'Raleway',
                    fontWeight: '600',
                    px: 2,
                    m: 1
                }}
                onClick={() => navigate('/register', {
                    state: {
                        accuracy
                            :
                            location.accuracy,
                        altitude
                            :
                            location.altitude,
                        altitudeAccuracy
                            :
                            location.altitudeAccuracy,
                        heading
                            :
                            location.heading,
                        latitude
                            :
                            location.latitude,
                        longitude
                            :
                            location.longitude,
                        speed
                            :
                            location.speed
                    }
                })}
            >
                continue
            </Button>
            <Map
                height={"80vh"}
                width={window.innerWidth - 40}
                defaultCenter={[location.latitude, location.longitude]}
                defaultZoom={15}
            >
                <Marker width={50} anchor={[location.latitude, location.longitude]} />
            </Map>
        </Box >
    );
}
