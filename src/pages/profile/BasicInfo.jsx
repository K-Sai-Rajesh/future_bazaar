import { Box, Chip, InputLabel, Stack, Typography } from "@mui/material";
import { customerProfileHeaders, profileHeaders } from "../../helpers/features";
import React, { useState } from "react";
import { getSession } from "../../helpers/cookies";
import * as Yup from 'yup';
import { useFormik } from "formik";
// import { snackon } from "../../reducers/slices/snackbar";
import CustomInputField from "../../common/CustomInputField";
import { UpdateProfile } from "../../reducers/slices/register";
import { useDispatch } from "react-redux";

function BasicInfo() {
    const { user } = getSession()
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = React.useState({})
    const [initialSchema, setInitialSchema] = React.useState({})
    const handleSubmit = async () => {
        try {
            await dispatch(UpdateProfile({ profile: register.values }))
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

    function SetRegister(user) {
        let initial = {}
        let validateSchema = {}
        let header = user?.role === 'seller' ? profileHeaders : customerProfileHeaders
        // eslint-disable-next-line
        header?.map(keys => {
            initial[keys?.name] = user[keys.name]
            validateSchema[keys?.name] =
                keys.name === "gst" ? "" :
                    (keys?.type === "text") ?
                        Yup.string().required(`Please enter ${keys.label} !`) :
                        keys?.type === "time" || keys?.type === "date" ? Yup.string().required(`Please enter ${keys.label} !`) :
                            Yup.number().required(`Please enter ${keys?.label} !`)

        })

        setInitialValues(initial)
        setInitialSchema(validateSchema)
    }
    React.useEffect(() => {
        SetRegister(user)
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
                            key={"key"}
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
                    (user?.role === 'customer' ? customerProfileHeaders : profileHeaders).map((head, idx) => (
                        <Box
                            sx={{ width: '250px' }}
                            key={idx}
                        >
                            <InputLabel
                                htmlFor={idx}
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
                    variant={edit ? "contained" : 'outlined'}
                    onClick={() => register.handleSubmit()}
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

export default React.memo(BasicInfo)