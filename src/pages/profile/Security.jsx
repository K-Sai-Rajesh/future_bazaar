import { Box, Chip, InputLabel, Stack, Typography } from "@mui/material";
import { securityHeaders } from "../../helpers/features";
import { useEffect, useState } from "react";
import { UpdateSecurity } from "../../reducers/slices/register";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { snackon } from "../../reducers/slices/snackbar";
import CustomInputField from "../../common/CustomInputField";

export default function Security() {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const [initialSchema, setInitialSchema] = useState({})

    const handleSubmit = async () => {
        try {
            await dispatch(UpdateSecurity({ security: register.values }))
        } catch (e) {
            console.error(e)
        }
    };
    const register = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape(initialSchema),
    })

    function SetRegister() {
        let initial = {}
        let validateSchema = {}
        // eslint-disable-next-line
        securityHeaders?.map(keys => {
            initial[keys?.name] = ""
            validateSchema[keys?.name] = Yup.string().required(`Please enter ${keys.label} !`);

        })

        setInitialValues(initial)
        setInitialSchema(validateSchema)
    }
    useEffect(() => {
        SetRegister()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Stack
                spacing={{ xs: 1 }}
                direction="row"
                useFlexGap
                sx={{
                    flexWrap: 'wrap', justifyContent: "end",
                    alignItems: "center", px: 6
                }}
            >
                <Chip
                    sx={{
                        cursor: 'pointer'
                    }}
                    onClick={() => setEdit(!edit)}
                    size="large"
                    variant={edit ? "contained" : "outlined"}
                    color='primary'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            edit
                        </Typography>
                    } />
            </Stack>
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
                    securityHeaders.map((head, idx) => (
                        <Box
                            sx={{ width: '250px' }}
                            key={idx}
                        >
                            <InputLabel
                                htmlFor={`${idx}`}
                                sx={{ fontFamily: "Raleway", fontWeight: "Bold" }}
                            >
                                {head.label}
                            </InputLabel>
                            <CustomInputField
                                id={`${idx}`}
                                key={`${idx}-${head.name}`}
                                name={head.name}
                                type={head.type}
                                size="small"
                                variant="outlined"
                                value={register.values[head.name] || ""}
                                disabled={edit ? head.disable : true}
                                fullWidth
                                aria-label={head.label.toLocaleLowerCase()}
                                sx={{ width: '250px', fontFamily: 'Raleway' }}
                                onChange={register.handleChange}
                                error={
                                    register.errors[head.name] && register.touched[head.name]
                                }
                                errormessage={
                                    register.errors[head.name] && register.touched[head.name]
                                        ? register.errors[head.name]
                                        : ""
                                }
                            />
                        </Box>
                    ))
                }
            </Stack>
            <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                sx={{
                    flexWrap: 'wrap', justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Chip
                    sx={{
                        cursor: 'pointer'
                    }}
                    size="large"
                    disabled={!edit}
                    onClick={() => register.handleSubmit()}
                    variant={edit ? "contained" : 'outlined'}
                    color='primary'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            update
                        </Typography>
                    } />
            </Stack>
        </>
    )
}