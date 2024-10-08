import * as React from 'react';
import { alpha, styled } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import { CookiesNames, getCookieItem } from '../../../helpers/cookies';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const token = getCookieItem(CookiesNames?.ACCESS_TOKEN);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Sitemark />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button href='/' variant="text" color="info" size="small"
                                sx={{
                                    fontFamily: 'Raleway'
                                }}
                            >
                                Home
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button href={token ? '/auth/profile/basic info' : '/login'} color="primary" variant="text" size="small"
                            sx={{
                                fontFamily: 'Raleway'
                            }}
                        >
                            {
                                token ? "Dashboard" : "Sign in"
                            }
                        </Button>
                        <Button href='/register' color="primary" variant="contained" size="small"
                            sx={{
                                fontFamily: 'Raleway'
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>
                                    <Button href='/'
                                        sx={{
                                            fontFamily: 'Raleway'
                                        }}
                                    >Home</Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button href={'/register'} color="primary" variant="contained" fullWidth
                                        sx={{
                                            fontFamily: 'Raleway'
                                        }}
                                    >
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button href={token ? '/auth/profile/basic info' : '/login'} color="primary" variant="outlined" fullWidth
                                        sx={{
                                            fontFamily: 'Raleway'
                                        }}
                                    >
                                        {
                                            token ? "Dashboard" : "Sign in"
                                        }
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}