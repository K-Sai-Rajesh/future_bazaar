import * as React from 'react'
import { Avatar, Dialog, DialogContent, Grid, IconButton, Paper, Slide } from '@mui/material'
import logo from '../assets/images/futurebazaar.png'
import Links from './Links'
import { WidgetsOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NAVBAR() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Grid
                container
                sx={{
                    position: 'fixed',
                    top: 0
                }}
                p={1}
            >
                <Grid
                    item
                    xs={12}
                    component={Paper}
                    elevation={3}
                    px={2}
                    py={1}
                    borderRadius={10}
                >
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Grid
                            item
                            xs={6}
                            sm={4}
                            lg={3}
                        >
                            <IconButton>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={logo}
                                />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            sm={8}
                            lg={9}
                            display={'flex'}
                            justifyContent={'end'}
                            alignItems={'center'}
                            columnGap={2}
                        >
                            {
                                window.innerWidth > 818 ?
                                    <Links />
                                    :
                                    <IconButton onClick={handleClickOpen}>
                                        <WidgetsOutlined sx={{ fontSize: '30px' }} />
                                    </IconButton>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Links />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default React.memo(NAVBAR)