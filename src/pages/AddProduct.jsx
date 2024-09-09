import { Box, Button, Grid, IconButton, ImageList, ImageListItem, InputAdornment, Paper, Typography } from "@mui/material";
import CustomInputField from "../common/CustomInputField";
import { useFormik } from "formik";
import { FileUploader } from 'react-drag-drop-files';
import * as Yup from 'yup'
import { useEffect, useState } from "react";
import { snackon } from "../reducers/slices/snackbar";
import { useDispatch } from "react-redux";
import { CurrencyRupeeOutlined, DescriptionOutlined, DiscountOutlined, InventoryOutlined, TitleOutlined } from "@mui/icons-material";
import { AddProduct, Category, EditProduct, GetProduct, SubCategory } from "../reducers/slices/seller";
import CustomSelectField from "../common/CustomSelectField";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddNewProduct() {
    const fileTypes = ["png", "jpeg", "jpg"];
    const [file, setFiles] = useState(null)
    const [files, setFile] = useState(null)
    const navigate = useNavigate()
    const { state } = useLocation()
    const [categories, setCategories] = useState({
        catgeories: [],
        sub: []
    })
    const dispatch = useDispatch()

    const handleChange = (file) => {
        try {
            if (file?.length > 3) {
                dispatch(snackon("Cannot Upload more than 3 files !"))
                return
            }
            setFiles(Object.values(file).map(file => URL.createObjectURL(file)))
            setFile(file)
        } catch (e) {
            console.error(e)
        }
    };

    async function handleSubmit() {
        try {

            if (state === null && (files === null || files?.length < 2)) {
                dispatch(snackon("Please Upload minimum of 2 Product Images !"))
                return
            }

            console.log(register.values, state)

            const { payload } = await dispatch(
                state === null ?
                    AddProduct({ ...register.values, files })
                    :
                    EditProduct({ ...register.values, files })
            )
            if (payload?.message) {
                dispatch(snackon(payload?.message))
                navigate(-1)
            } else {
                dispatch(snackon("Server Error !"))
            }
        } catch (e) {
            console.error(e)
            dispatch(snackon("Please Check the connectivity !"))
        }
    }

    const register = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: '',
            subcategory: "",
            stock: null,
            mrp: null,
            discount: null,
            discountedPrice: null,
            ids: [],
            productId: '',
            paths: []
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Please enter email !"),
            description: Yup.string().required("Please enter your password !"),
            category: Yup.string().required("Please specify the category !"),
            subcategory: Yup.string().required("Please specify the sub category !"),
            stock: Yup.number().required("Please enter your Stock !"),
            mrp: Yup.number().required("Please enter your MRP !"),
            discount: Yup.number().required("Please enter your Discount in (%) !"),
        }),
    })
    // eslint-disable-next-line
    async function getCategories() {
        try {
            const { payload } = await dispatch(Category())
            if (payload) {
                console.log(payload)
                setCategories(prev => {
                    return {
                        ...prev,
                        catgeories: payload ? payload : []
                    }
                })
                if (payload[0]) {
                    console.log(payload[0].title)
                    register.setFieldValue('category', payload[0].title)
                    // getSubCategories(payload[0].title)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function getSubCategories(category) {
        try {
            const { payload } = await dispatch(SubCategory(category))
            if (payload) {
                register.setFieldValue('subcategory', payload[0].subcategory)
                setCategories(prev => {
                    return {
                        ...prev,
                        sub: payload ? payload : []
                    }
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function getProductData(id) {
        try {
            const { payload } = await dispatch(GetProduct(id))
            console.log(payload.result)
            const paths = payload.result.map(item => `http://localhost:8080/${item.path}`)
            const ids = payload.result.map(ids => ids.id)
            const keys = [
                'title', 'description', 'category', 'subcategory',
                'stock', 'mrp', 'discount', 'discountedPrice', 'productId'
            ]
            register.setFieldValue('id', ids)
            register.setFieldValue('paths', paths)

            keys.forEach(key => {
                register.setFieldValue(key, payload.result[0][key])
            })
            setFiles(paths)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getCategories()
        if (state !== null) {
            getProductData(state)
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (register.values.category) {
            getSubCategories(register.values.category)
        }
        // eslint-disable-next-line
    }, [register.values.category])

    return (
        <>
            <Grid
                container
                maxWidth={'lg'}
                component={Paper}
                elevation={0}
                pt={1}
                px={2}
                flexGrow={1}
                rowGap={2}
                justifyContent={'space-between'}
                sx={{
                    backgroundColor: '#F1F1F1'
                }}
            >
                <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'end'}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                            px: 2
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>&ensp;
                    <Button
                        variant="contained"
                        size="small"
                        disableElevation
                        sx={{
                            textTransform: 'none',
                            borderRadius: 15,
                            fontSize: '13px',
                            fontFamily: 'Raleway',
                            fontWeight: '600',
                            px: 2
                        }}
                        onClick={() => register.handleSubmit()}
                    >

                        {
                            state === null ? "Add" : "Update"
                        }
                    </Button>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={0}
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    xs={12}
                    md={6}
                    p={2}
                >
                    <Box>
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            classes="file-uploader-styles"
                            style={{
                                width: '100px !important'
                            }}
                            types={fileTypes}
                        />
                        <Typography
                            fontSize='10px'
                            fontFamily='Raleway'
                            fontWeight='800'
                            color="#9E9E9E"
                            mt={1}
                        >
                            {
                                file === null ?
                                    "Please Upload File here !"
                                    :
                                    file?.name
                            }
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={0}
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    xs={12}
                    md={6}
                    p={2}
                >
                    <ImageList sx={{ width: 500, height: "auto" }} cols={3} rowHeight={164}>
                        {
                            file === null ?
                                <Typography
                                    fontFamily={'Raleway'}
                                    fontSize={15}
                                    fontWeight={'bold'}
                                >
                                    Please add Images !
                                </Typography>
                                :
                                file.map((path) => (
                                    <ImageListItem key={path}>
                                        <img
                                            src={path}
                                            style={{
                                                width: 164,
                                                height: 164,
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                            alt={path}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                    </ImageList>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={0}
                    xs={12}
                    lg={6.9}
                    p={2}
                >
                    <Grid
                        container
                        columnSpacing={1}
                        rowGap={2}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            pt={0.7}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="title"
                                label="Product"
                                name="title"
                                autoComplete="product"
                                size='small'
                                value={register?.values?.title === null ? "" : register?.values?.title}
                                onChange={register.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            edge="center"
                                        >
                                            <TitleOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                error={
                                    register.errors.title && register.touched.title
                                }
                                errormessage={
                                    register.errors.title && register.touched.title
                                        ? register.errors.title
                                        : ""
                                }
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important',
                                    fontSize: '14px'
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
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
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                        >
                            <CustomSelectField
                                id="subcategory"
                                name="subcategory"
                                label={"Sub Category"}
                                variant="outlined"
                                type={"text"}
                                value={register.values.subcategory}
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
                                    register.errors.subcategory && register.touched.subcategory
                                }
                                errormessage={
                                    register.errors.subcategory && register.touched.subcategory
                                        ? register.errors.subcategory
                                        : ""
                                }
                            >
                                <option valu e={""}>Select</option>
                                {categories.sub?.map((option, idx) => {
                                    return <option key={idx} value={option.subcategory}>{option.subcategory}</option>
                                })}
                            </CustomSelectField>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="description"
                                label="Product Description"
                                name="description"
                                autoComplete="description"
                                size='small'
                                multiline={true}
                                rows={3}
                                value={register?.values?.description}
                                onChange={register.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            // onClick={() => setShow(!show)}
                                            edge="center"
                                        >
                                            <DescriptionOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                error={
                                    register.errors.description && register.touched.description
                                }
                                errormessage={
                                    register.errors.description && register.touched.description
                                        ? register.errors.description
                                        : ""
                                }
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    elevation={0}
                    xs={12}
                    lg={5}
                    p={2}
                >
                    <Grid
                        container
                        columnSpacing={1}
                        rowGap={2}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                fontFamily={'Raleway'}
                                fontSize={15}
                                fontWeight={'bold'}
                                color={'#201F7D'}
                            >
                                Product Info
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="stock"
                                label="Product Stock"
                                name="stock"
                                type='number'
                                autoComplete="stock"
                                size='small'
                                value={register?.values?.stock}
                                onChange={register.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            // onClick={() => setShow(!show)}
                                            edge="center"
                                        >
                                            <InventoryOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                error={
                                    register.errors.stock && register.touched.stock
                                }
                                errormessage={
                                    register.errors.stock && register.touched.stock
                                        ? register.errors.stock
                                        : ""
                                }
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important'
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="mrp"
                                label="MRP"
                                name="mrp"
                                autoComplete="mrp"
                                size='small'
                                type='number'
                                value={register?.values?.mrp}
                                onChange={register.handleChange}
                                error={
                                    register.errors.mrp && register.touched.mrp
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            // onClick={() => setShow(!show)}
                                            edge="center"
                                        >
                                            <CurrencyRupeeOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onInput={(e) => {
                                    const { value } = e.target
                                    let discountValue = value - (register.values.discount / 100) * value
                                    register.setFieldValue("discountedPrice", discountValue)
                                }}
                                errormessage={
                                    register.errors.mrp && register.touched.mrp
                                        ? register.errors.mrp
                                        : ""
                                }
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important'
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="discount"
                                label="Discount ( % )"
                                name="discount"
                                autoComplete="discount"
                                size='small'
                                type='number'
                                value={register?.values?.discount}
                                onChange={register.handleChange}
                                error={
                                    register.errors.discount && register.touched.discount
                                }
                                errormessage={
                                    register.errors.discount && register.touched.discount
                                        ? register.errors.discount
                                        : ""
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            // onClick={() => setShow(!show)}
                                            edge="center"
                                        >
                                            <DiscountOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onInput={(e) => {
                                    const { value } = e.target
                                    let discountValue = register.values.mrp - (value / 100) * register.values.mrp
                                    register.setFieldValue("discountedPrice", discountValue)
                                }}
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important'
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <CustomInputField
                                required
                                fullWidth
                                id="discountedPrice"
                                label="Price"
                                name="discountedPrice"
                                autoComplete="discountedPrice"
                                type='number'
                                size='small'
                                value={register?.values?.discountedPrice}
                                onChange={register.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="mrp"
                                            // onClick={() => setShow(!show)}
                                            edge="center"
                                        >
                                            <CurrencyRupeeOutlined sx={{ fontSize: '20px' }} />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                error={
                                    register.errors.discountedPrice && register.touched.discountedPrice
                                }
                                errormessage={
                                    register.errors.discountedPrice && register.touched.discountedPrice
                                        ? register.errors.discountedPrice
                                        : ""
                                }
                                sx={{
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold !important'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}