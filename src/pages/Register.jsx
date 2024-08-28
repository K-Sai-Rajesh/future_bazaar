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
import { useDispatch } from 'react-redux';
import { Register } from '../reducers/slices/register';
import { snackon } from '../reducers/slices/snackbar';

export default function SignUp() {
    const [show, setShow] = React.useState(false)
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        try {
            // if (register?.values?.phone?.length < 10) {
            //     snackon("Phone Number Cannot be less than 10 Digits !")
            //     return
            // }
            const { payload } = await dispatch(Register(register?.values))
            dispatch(snackon(payload));
        } catch (e) {
            console.error(e)
        }
    };
    // eslint-disable-next-line
    const formKeys = [
        {
            id: "firstname",
            label: "First Name (*)",
            type: 'text',
            colSize: 4
        },
        {
            id: "lastname",
            label: "Last Name (*)",
            type: 'text',
            colSize: 4
        },
        {
            id: "email",
            label: "Email Address (*)",
            type: 'text',
            colSize: 4
        },
        {
            id: "shopName",
            label: "Shop Name (*)",
            type: 'text',
            colSize: 4
        },
        {
            id: "shopPhoneNumber",
            label: "Shop Phone Number (*)",
            type: 'number',
            colSize: 4
        },
        {
            id: "shopDescription",
            label: "Shop Description (*)",
            type: 'text',
            colSize: 4
        },
        {
            id: "shopStartTime",
            label: "Shop Opening Time (*)",
            type: 'time',
            colSize: 4
        },
        {
            id: "shopEndTime",
            label: "Shop Closing Time (*)",
            type: 'time',
            colSize: 4
        },
        {
            id: "gst",
            label: "GST Number (optional)",
            type: 'number',
            colSize: 4
        },
        {
            id: "phone",
            label: "Phone Number (*)",
            type: 'number',
            colSize: 6
        },
        {
            id: "password",
            label: "Password (*)",
            type: 'password',
            colSize: 6
        },
    ] 
    const [initialValues, setInitialValues] = React.useState({})
    const [initialSchema, setInitialSchema] = React.useState({})

    const register = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape(initialSchema),
    })

    React.useEffect(() => {
        let initial = {}
        let validateSchema = {}
        // eslint-disable-next-line
        formKeys?.map(keys => {
            initial[keys?.id] = ""
            validateSchema[keys?.id] =
                keys.id === "gst" ? "" :
                    (keys?.type === "text" || keys?.type === "password") ?
                        Yup.string().required(`Please enter ${keys.label} !`) :
                        keys?.type === "time" ? Yup.string().required(`Please enter ${keys.label} !`) :
                            Yup.number().required(`Please enter ${keys?.label} !`)

        })
        setInitialValues(initial)
        setInitialSchema(validateSchema)
        // eslint-disable-next-line
    }, [formKeys])

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
                        Register
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {
                                formKeys?.map(key => {
                                    return (
                                        <Grid item xs={12} sm={key.colSize}>
                                            <CustomInputField
                                                autoComplete={key?.label}
                                                name={key?.id}
                                                required
                                                fullWidth
                                                id={key?.id}
                                                label={key?.label}
                                                type={key?.type === 'password' ? show ? "text" : key?.type : key?.type}
                                                value={register?.values[key?.id]}
                                                onChange={register.handleChange}
                                                error={
                                                    register.errors[key?.id] && register.touched[key?.id]
                                                }
                                                errormessage={
                                                    register.errors[key?.id] && register.touched[key?.id]
                                                        ? register.errors[key?.id]
                                                        : ""
                                                }
                                                endAdornment={
                                                    key.id === "password" &&
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShow(!show)}
                                                            edge="end"
                                                        >
                                                            {
                                                                show ?
                                                                    <VisibilityOff /> :
                                                                    <Visibility />
                                                            }
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onInput={(e) => {

                                                    if (key?.id === "phone" || key?.id === "shopPhoneNumber") {
                                                        if (e.target.value?.length > 10)
                                                            e.target.value = register?.values[key?.id]
                                                        else if (e.target.value?.length > 10)
                                                            register.setErrors(key?.id, "Cannot be less than 10 digits !")

                                                    }
                                                }}
                                                autoFocus
                                                size='small'
                                                sx={{
                                                    fontFamily: 'Raleway',
                                                    fontWeight: 'bold !important'
                                                }}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            size='small'
                            sx={{ mt: 3, mb: 2, textTransform: 'capitalize' }}
                            onClick={() => register.handleSubmit()}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">

                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Link href="/" variant="body2" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '10px' }}>
                                    Home
                                </Link>
                                <Link href="/login" variant="body2" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '10px' }}>
                                    Already have an account? Sign in
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