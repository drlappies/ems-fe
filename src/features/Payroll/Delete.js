import { useContext, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deletePayrollById, batchDeletePayroll } from '../../redux/thunks/payroll'
import { DrawerContext } from '../../contexts/DrawerContext'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteDrawer(props) {
    const { refresh, selected } = props;
    const dispatch = useDispatch();
    const { closeDrawer } = useContext(DrawerContext);

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(deletePayrollById(selected[0], () => {
                closeDrawer()
                refresh()
            }))
        } else {
            dispatch(batchDeletePayroll(selected, () => {
                closeDrawer()
                refresh()
            }))
        }
    }, [closeDrawer, dispatch, refresh, selected])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Delete Payroll</Typography>
            <Typography variant="body1">Are you sure you want to delete this payroll?</Typography>
            <Typography variant="body1">This action cannot be undone.</Typography>
            <LoadingButton
                disableRipple
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={handleSubmit}
            >
                Delete
            </LoadingButton>
        </Stack>
    )
}

export default DeleteDrawer