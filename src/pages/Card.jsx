import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';

export default function ReviewCard({ count, title, icon, elevation, setStatus }) {

    return (
        <Card
            elevation={elevation}
            sx={{
                cursor: 'pointer'
            }}
            onClick={() => setStatus(title)}
        >
            <CardHeader
                avatar={
                    icon
                }
                title={
                    <Typography
                        fontFamily={"Raleway"}
                        fontWeight={600}
                        color={'secondary'}
                    >
                        {
                            count
                        }
                    </Typography>
                }
                subheader={
                    <Typography
                        fontFamily={"Raleway"}
                        fontWeight={600}
                    >
                        {
                            title
                        }
                    </Typography>
                }
            />
        </Card>
    );
}
