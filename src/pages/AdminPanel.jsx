import { Grid, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { RegisterData, SellerStatusUpdate } from "../reducers/slices/admin";
import { useEffect, useState } from "react";
import ReviewCard from "./Card";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EnhancedTable from "../common/Table";
import { DoNotDisturbAltOutlined } from "@mui/icons-material";
import { snackon } from "../reducers/slices/snackbar";

export default function AdminPanel() {
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const [status, setStatus] = useState("Approved")
    const headCell = [
        {
            id: 'firstname',
            label: 'First Name',
            minWidth: 100
        },
        {
            id: 'lastname',
            label: 'SurName',
            minWidth: 100
        },
        {
            id: 'shopName',
            label: 'Shop Name',
            minWidth: 100
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 100
        },
        {
            id: 'phone',
            label: 'Phone Number',
            minWidth: 100
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 100
        },
        {
            id: 'appliedDate',
            label: 'Applied Date',
            minWidth: 100
        },
        {
            id: 'approvedDate',
            label: 'Approved Date',
            minWidth: 100
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 100
        },
    ]

    const Admin = async () => {
        try {
            const { payload } = await dispatch(RegisterData())
            if (typeof (payload) === 'object')
                setList(payload)
            else
                snackon({ message: payload, color: 'error' })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        Admin()
        // eslint-disable-next-line
    }, [dispatch])

    async function rejectSeller(data) {
        try {
            const { payload } = await dispatch(SellerStatusUpdate({ ...data, status: "Rejected" }))
            console.log(payload)
            Admin()
        } catch (e) {
            console.error(e)
        }
    }

    async function acceptSeller(data) {
        try {
            const { payload } = await dispatch(SellerStatusUpdate({ ...data, status: "Approved" }))
            Admin()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Grid
                container
                columnSpacing={2}
                justifyContent={'center'}
                rowGap={2}
                maxWidth={'xl'}
                p={1}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Stack
                        direction={{ xs: 'row' }}
                        columnGap={2}
                        rowGap={1}
                        sx={{
                            whiteSpace: "normal",
                            flexWrap: 'wrap',
                            overflow: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2
                        }}>
                        <ReviewCard
                            count={list?.filter(seller => seller?.status === 'Approved')?.length}
                            title={"Approved"}
                            elevation={status === "Approved" ? 5 : 0}
                            setStatus={setStatus}
                            icon={<CheckBoxIcon color={status === "Approved" ? 'info' : ""} sx={{ fontSize: '40px', color: status === "Approved" ? "" : '#9A9A9A' }} />}
                        />
                        <ReviewCard
                            count={list?.filter(seller => seller?.status === 'Pending')?.length}
                            title={"Pending"}
                            elevation={status === "Pending" ? 5 : 0}
                            setStatus={setStatus}
                            icon={<PendingActionsIcon color={status === "Pending" ? 'warning' : ""} sx={{ fontSize: '40px', color: status === "Pending" ? "" : "#9A9A9A" }} />}
                        />
                        <ReviewCard
                            count={list?.filter(seller => seller?.status === 'Rejected')?.length}
                            title={"Rejected"}
                            elevation={status === "Rejected" ? 5 : 0}
                            setStatus={setStatus}
                            icon={<DoNotDisturbAltOutlined color={status === "Rejected" ? 'error' : ""} sx={{ fontSize: '40px', color: status === "Rejected" ? "" : "#9A9A9A" }} />}
                        />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <EnhancedTable
                        rows={list?.filter(seller => seller?.status === status)}
                        headCells={headCell}
                        status={status}
                        icon={false}
                        actions={true}
                        rejectSeller={rejectSeller}
                        acceptSeller={acceptSeller}
                    />
                </Grid>
            </Grid>
        </>
    )
}