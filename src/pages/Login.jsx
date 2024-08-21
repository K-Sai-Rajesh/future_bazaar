import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import Copyright from './CopyRight';
import CustomInputField from '../common/CustomInputField';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { useFormik } from 'formik'
import { Visibility, VisibilityOff } from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
    const [show, setShow] = React.useState(false)
    const handleSubmit = () => {
        console.log(register?.values);
    };
    const register = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Please enter email !"),
            password: Yup.string().required("Please enter your password !")
        }),
    })
    return (
        <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
        >
            <Grid
                item
                xs={12}
                lg={4}
                sm={8}
                component={Paper}
                elevation={9}
                pb={2}
            >
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        fontFamily={'Raleway'}
                        fontWeight={'bold'}
                    >
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomInputField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    size='small'
                                    value={register?.values?.email}
                                    onChange={register.handleChange}
                                    error={
                                        register.errors.email && register.touched.email
                                    }
                                    errormessage={
                                        register.errors.email && register.touched.email
                                            ? register.errors.email
                                            : ""
                                    }
                                    sx={{
                                        fontFamily: 'Raleway',
                                        fontWeight: 'bold !important'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomInputField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={show ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
                                    value={register?.values?.password}
                                    onChange={register.handleChange}
                                    error={
                                        register.errors.password && register.touched.password
                                    }
                                    errormessage={
                                        register.errors.password && register.touched.password
                                            ? register.errors.password
                                            : ""
                                    }
                                    size='small'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShow(!show)}
                                                edge="end"
                                            >
                                                {show ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{
                                        fontFamily: 'Raleway',
                                        fontWeight: 'bold !important'
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size='small'
                            sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
                            onClick={register.handleSubmit}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Link href="/" variant="body2" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '10px' }}>
                                    Home
                                </Link>
                                <Link href="/register" variant="body2" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '10px' }}>
                                    Get an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Copyright />
        </Grid>
    );
}