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
import CustomInputField from '../common/CustomInputField';
import { Chip, Fab, IconButton, InputAdornment, InputLabel, Paper, Stack } from '@mui/material';
import { useFormik } from 'formik'
import { MyLocationOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Register } from '../reducers/slices/register';
import { snackon } from '../reducers/slices/snackbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { customerKeys, formKeys } from '../helpers/features';
import CustomSelectField from '../common/CustomSelectField';
import { Category } from '../reducers/slices/seller';

export default function SignUp() {
    const [show, setShow] = React.useState(false)
    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [categories, setCategories] = React.useState([])
    const [seller, setSeller] = React.useState(false)
    const handleSubmit = async () => {
        try {
            if (register?.values?.phone?.length < 10) {
                snackon({ message: "Phone Number Cannot be less than 10 Digits !", color: 'warning' })
                return
            }
            await dispatch(Register({ ...register?.values, role: seller ? 'seller' : 'customer' }))
        } catch (e) {
            console.error(e)
        }
    };
    // eslint-disable-next-line

    const [initialValues, setInitialValues] = React.useState({})
    const [initialSchema, setInitialSchema] = React.useState({})
    const register = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape(initialSchema),
    })

    function SetRegister(formKeys) {
        let initial = {}
        let validateSchema = {}
        // eslint-disable-next-line
        formKeys?.forEach(keys => {
            initial[keys?.id] = ""
            validateSchema[keys?.id] = keys.id === "gst" ? "" : keys.error
        })
        initial['latitude'] = state?.latitude
        initial['longitude'] = state?.longitude
        initial['error'] = state?.accuracy

        setInitialValues(initial)
        setInitialSchema(validateSchema)
    }

    async function getCategories() {
        try {
            const { payload } = await dispatch(Category())
            if (payload) {
                setCategories(payload ? payload : [])
                if (payload[0]) {
                    register.setFieldValue('category', payload[0].title)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    React.useEffect(() => {
        SetRegister(seller ? formKeys : customerKeys)
        getCategories()
        // eslint-disable-next-line
    }, [])

    function Locate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                navigate("/map", {
                    state: {
                        accuracy
                            :
                            position.coords.accuracy,
                        altitude
                            :
                            position.coords.altitude,
                        altitudeAccuracy
                            :
                            position.coords.altitudeAccuracy,
                        heading
                            :
                            position.coords.heading,
                        latitude
                            :
                            position.coords.latitude,
                        longitude
                            :
                            position.coords.longitude,
                        speed
                            :
                            position.coords.speed
                    }
                })
            }, function (e) {
                console.error(e)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,            // Timeout in milliseconds
                maximumAge: 0
            })
        }
    }

    return (
        <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid
                item
                xs={12}
                component={Paper}
                elevation={0}
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
                    <Stack
                        direction={{ xs: 'column' }}
                        width={'100%'}
                        rowGap={0.5}
                        columnGap={3}
                        sx={{
                            whiteSpace: "normal",
                            flexWrap: 'wrap',
                            overflow: 'auto',
                            py: `0px !important`,
                        }}
                    >
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            alignSelf={'center'}
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
                        </Box>
                        <Box
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            width={'100%'}
                        >
                            <InputLabel
                                htmlFor={"idx"}
                                sx={{ fontFamily: "Raleway", fontWeight: "Bold" }}
                            >
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'15px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                    // color={'error'}
                                >
                                    {

                                        seller ? 'seller' : 'customer'
                                    }
                                </Typography>
                            </InputLabel>
                            <Chip
                                sx={{ cursor: 'pointer' }}
                                variant={'outlined'}
                                size='large'
                                onClick={() => { setSeller(!seller); SetRegister(seller ? customerKeys : formKeys) }}
                                color={'primary'}
                                label={
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                        textTransform={'capitalize'}
                                    >
                                        {seller ? "register as customer" : "register as seller"}
                                    </Typography>
                                } />
                        </Box>
                    </Stack>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack
                                    spacing={{ xs: 1, sm: 2 }}
                                    direction="row"
                                    useFlexGap
                                    sx={{
                                        flexWrap: 'wrap', justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {
                                        (seller ? formKeys : customerKeys)?.map((key, idx) => {
                                            return (
                                                <Box
                                                    sx={{ width: '250px' }}
                                                    id={key?.id}
                                                    key={idx}
                                                >
                                                    {
                                                        key.isList ?
                                                            <CustomSelectField
                                                                id="category"
                                                                name="category"
                                                                label={"Categories"}
                                                                variant="outlined"
                                                                type={"text"}
                                                                value={register.values.category}
                                                                onChange={register.handleChange}
                                                                onBlur={register.handleBlur}
                                                                fullWidth
                                                                sx={{
                                                                    fontFamily: 'Raleway',
                                                                    fontWeight: 'bold !important',
                                                                    color: '#707070',
                                                                    fontSize: '14px'
                                                                }}
                                                                error={
                                                                    register.errors.category && register.touched.category
                                                                }
                                                                errormessage={
                                                                    register.errors.category && register.touched.category
                                                                        ? register.errors.category
                                                                        : ""
                                                                }
                                                            >
                                                                <option value={""}>Select</option>
                                                                {categories?.map((option, idx) => {
                                                                    return <option key={idx} value={option.title}>{option.title}</option>
                                                                })}
                                                            </CustomSelectField>
                                                            :
                                                            <CustomInputField
                                                                autoComplete={key?.label}
                                                                name={key?.id}
                                                                required
                                                                fullWidth
                                                                id={key?.id}
                                                                label={key?.label}
                                                                type={key?.type === 'password' ? show ? "text" : key?.type : key?.type}
                                                                value={register?.values[key?.id] ? register?.values[key?.id] : ''}
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
                                                    }
                                                </Box>
                                            )
                                        })
                                    }
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size='small'
                                    sx={{ mt: 3, mb: 2, textTransform: 'capitalize', fontFamily: "Raleway" }}
                                    disabled={state === null ? true : false}
                                    onClick={() => register.handleSubmit()}
                                >
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                                <Fab
                                    color="primary"
                                    aria-label="location"
                                    onClick={() => Locate()}
                                >
                                    <MyLocationOutlined />
                                </Fab>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                                <Link href="/login" variant="body2" sx={{ fontFamily: 'Raleway', fontWeight: 'bold', fontSize: '10px' }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}