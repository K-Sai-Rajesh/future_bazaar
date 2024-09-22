import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Avatar, Badge, Box, Chip, Grid, InputLabel, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'
import CustomInputField from "../common/CustomInputField";
import { useFormik } from "formik";
import CustomSelectField from "../common/CustomSelectField";
import { Category } from "../reducers/slices/seller";
import { snackon } from "../reducers/slices/snackbar";
import { AddSingleCategory, AddSubCategory } from "../reducers/slices/admin";


export default function AddCategory() {

    const dispatch = useDispatch()
    const [propic, setPropic] = useState({
        url: `https://mui.com/static/images/avatar/5.jpg`,
        file: null
    })
    const [categorypic, setCategoryPic] = useState({
        url: `https://mui.com/static/images/avatar/5.jpg`,
        file: null
    })
    const [categories, setCategories] = useState({
        catgeories: [],
        sub: []
    })
    const handleSubmit = async () => {
        try {
            if (propic.file === null) {
                dispatch(snackon({ message: 'Please upload a sub category pic !', color: 'error' }))
                return
            }
            const param = {
                ...register.values,
                file: propic.file
            }
            console.log(param)
            const { payload } = await dispatch(AddSubCategory(param))
            console.log(payload)
        } catch (e) {
            console.error(e)
        }
    };
    const handleCategorySubmit = async () => {
        try {
            if (categorypic.file === null) {
                dispatch(snackon({ message: 'Please upload a category pic !', color: 'error' }))
                return
            }
            const param = {
                ...category.values,
                file: categorypic.file
            }
            const { payload } = await dispatch(AddSingleCategory(param))
            console.log(payload)
        } catch (e) {
            console.error(e)
        }
    };

    async function getCategories() {
        try {
            const { payload } = await dispatch(Category())
            if (payload) {
                setCategories(prev => {
                    return {
                        ...prev,
                        catgeories: payload ? payload : []
                    }
                })
                if (payload[0]) {
                    register.setFieldValue('category', payload[0].title)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const register = useFormik({
        initialValues: {
            category: '',
            subcategory: ''
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            category: Yup.string().required(`Please select a category !`),
            subcategory: Yup.string().required(`Please enter a subcategory !`)
        }),
    })


    const category = useFormik({
        initialValues: {
            category: '',
        },
        enableReinitialize: true,
        onSubmit: handleCategorySubmit,
        validationSchema: Yup.object().shape({
            category: Yup.string().required(`Please select a category !`)
        }),
    })

    async function handleProPicChange(e) {
        try {
            const { files } = e.target;
            setPropic({
                url: URL.createObjectURL(files[0]),
                file: files[0]
            })
        } catch (e) {
            console.error(e)
        }
    }

    async function handleCategoryPicChange(e) {
        try {
            const { files } = e.target;
            setCategoryPic({
                url: URL.createObjectURL(files[0]),
                file: files[0]
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Grid
            item
            xs={12}
            py={2}
        >
            <Grid
                container
                justifyContent={'center'}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography
                        fontFamily={"Nunito"}
                        textTransform={"capitalize"}
                        fontSize={18}
                        fontWeight={"bold"}
                    >
                        add category
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap', justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            overlap="circular"
                            onClick={() => document.getElementById('categorypropic').click()}
                            badgeContent={
                                <DriveFolderUploadOutlined
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        p: 1,
                                        backgroundColor: '#F1F1F1',
                                        borderRadius: 5,
                                        cursor: 'pointer',
                                        color: '#33294E'
                                    }}
                                />
                            }
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={categorypic.url}
                                sx={{
                                    width: 256,
                                    height: 256,
                                    backgroundColor: '#fff'
                                }}
                            />
                            <input id="categorypropic" type="file" onChange={handleCategoryPicChange} style={{ display: 'none' }} />
                        </Badge>
                        <Box
                            sx={{ width: '250px' }}
                            display={'flex'}
                            flexDirection={'column'}
                            rowGap={1}
                        >
                            <InputLabel
                                // htmlFor={idx}
                                sx={{ fontFamily: "Raleway", fontWeight: "Bold" }}
                            >
                                Category
                            </InputLabel>
                            <CustomInputField
                                name={'category'}
                                type={'text'}
                                size="small"
                                variant="outlined"
                                value={category.values.category}
                                fullWidth
                                aria-label={'head.label.toLocaleLowerCase()'}
                                sx={{ width: '250px', fontFamily: 'Raleway' }}
                                onChange={category.handleChange}
                                error={
                                    category.errors.category && category.touched.category
                                }
                                errormessage={
                                    category.errors.category && category.touched.category
                                        ? category.errors.category
                                        : ""
                                }
                            />
                            <Chip
                                sx={{
                                    cursor: 'pointer'
                                }}
                                size="large"
                                // disabled={!edit}
                                variant={'outlined'}
                                onClick={() => category.handleSubmit()}
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
                                        upload
                                    </Typography>
                                }
                            />
                        </Box>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap', justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            overlap="circular"
                            onClick={() => document.getElementById('propic').click()}
                            badgeContent={
                                <DriveFolderUploadOutlined
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        p: 1,
                                        backgroundColor: '#F1F1F1',
                                        borderRadius: 5,
                                        cursor: 'pointer',
                                        color: '#33294E'
                                    }}
                                />
                            }
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={propic.url}
                                sx={{
                                    width: 256,
                                    height: 256,
                                    backgroundColor: '#fff'
                                }}
                            />
                            <input id="propic" type="file" onChange={handleProPicChange} style={{ display: 'none' }} />
                        </Badge>
                        <Box
                            sx={{ width: '250px' }}
                            display={'flex'}
                            flexDirection={'column'}
                            rowGap={1}
                        >
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
                                {categories.catgeories?.map((option, idx) => {
                                    return <option key={idx} value={option.title}>{option.title}</option>
                                })}
                            </CustomSelectField>
                        </Box>
                        <Box
                            sx={{ width: '250px' }}
                            display={'flex'}
                            flexDirection={'column'}
                            rowGap={1}
                        >
                            <InputLabel
                                // htmlFor={idx}
                                sx={{ fontFamily: "Raleway", fontWeight: "Bold", fontSize: '12px' }}
                            >
                                Sub Category
                            </InputLabel>
                            <CustomInputField
                                name={'subcategory'}
                                type={'text'}
                                size="small"
                                variant="outlined"
                                value={register.values.subcategory}
                                fullWidth
                                aria-label={'head.label.toLocaleLowerCase()'}
                                sx={{ width: '250px', fontFamily: 'Raleway' }}
                                onChange={register.handleChange}
                                error={
                                    register.errors.subcategory && register.touched.subcategory
                                }
                                errormessage={
                                    register.errors.subcategory && register.touched.subcategory
                                        ? register.errors.subcategory
                                        : ""
                                }
                            />
                            <Chip
                                sx={{
                                    cursor: 'pointer'
                                }}
                                size="large"
                                // disabled={!edit}
                                variant={'outlined'}
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
                                        upload
                                    </Typography>
                                }
                            />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}