import { useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putPayroll, batchUpdatePayroll } from '../../redux/thunks/payroll';
import { DrawerContext } from '../../contexts/DrawerContext'
import useInput from '../../hooks/useInput'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import UpdateIcon from '@mui/icons-material/Update';


function UpdateDrawer(props) {
    const { refresh, selected } = props;

    const { closeDrawer } = useContext(DrawerContext)
    const dispatch = useDispatch();
    const payrollList = useSelector(state => state.payroll.payrollList);
    const payroll = payrollList.find(payroll => payroll.id.toString() === selected[0])
    const [status, handleStatusChange] = useInput(selected.length <= 1 ? payroll.status : "")

    const handleSubmit = useCallback(() => {
        console.log("subbitting")

        if (selected.length <= 0) {
            dispatch(putPayroll(selected[0], status, () => {
                closeDrawer()
                refresh()
            }))
        } else {
            dispatch(batchUpdatePayroll(selected, status, () => {
                closeDrawer()
                refresh()
            }))
        }

    }, [closeDrawer, dispatch, refresh, selected, status])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Update Payroll</Typography>
            <TextField
                size="small"
                variant="standard"
                label="Status"
                select
                value={status}
                onChange={handleStatusChange}
            >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
            </TextField>
            <LoadingButton
                disableRipple
                color="inherit"
                startIcon={<UpdateIcon />}
                onClick={handleSubmit}
            >
                Update
            </LoadingButton>
        </Stack>
    )
}

export default UpdateDrawer