import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SitemarkIcon from './SitemarkIcon';
import { FacebookOutlined, Instagram } from '@mui/icons-material';

function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontFamily: 'Raleway' }}>
            {'Copyright © '}
            <Link color="text.secondary" href="https://mui.com/">
                Sitemark
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <React.Fragment>
            <Divider />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 8 },
                    py: { xs: 8, sm: 10 },
                    textAlign: { sm: 'center', md: 'left' },
                    zIndex: 100
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        <Box display={'flex'} justifyContent={'center'} sx={{ width: { xs: '100%' } }}>
                            <SitemarkIcon />
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{ fontWeight: 600, mt: 2, fontFamily: "Raleway" }}
                            >
                                Join today
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: { xs: 4, sm: 8 },
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        <Link color="text.secondary" variant="body2" href="#" sx={{ fontFamily: "Raleway" }}>
                            Privacy Policy
                        </Link>
                        <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                            &nbsp;•&nbsp;
                        </Typography>
                        <Link color="text.secondary" variant="body2" href="#" sx={{ fontFamily: "Raleway" }}>
                            Terms of Service
                        </Link>
                        <Copyright />
                    </div>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://github.com/mui"
                            aria-label="GitHub"
                            sx={{ alignSelf: 'center' }}
                        >
                            <FacebookOutlined />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://x.com/MaterialUI"
                            aria-label="X"
                            sx={{ alignSelf: 'center' }}
                        >
                            <Instagram />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}