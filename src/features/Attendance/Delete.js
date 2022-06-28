import { useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteAttendanceById, deleteManyByIds } from '../../redux/thunks/attendance'
import { DrawerContext } from '../../contexts/DrawerContext'
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteDrawer(props) {
    const { selected, refresh } = props;
    const { closeDrawer } = useContext(DrawerContext)
    const dispatch = useDispatch()

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(deleteAttendanceById(selected[0], () => {
                closeDrawer()
                refresh()
            }))
        } else {
            dispatch(deleteManyByIds(selected, () => {
                closeDrawer()
                refresh()
            }))
        }
    }, [closeDrawer, dispatch, refresh, selected])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Delete Attendance</Typography>
            <Typography variant="body1" fontWeight="bold">Deleting ID(s): </Typography>
            <Typography variant="body2" fontWeight="bold">{selected.map(el => `${el}, `)}</Typography>
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