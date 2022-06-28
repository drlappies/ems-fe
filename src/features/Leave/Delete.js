import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { DrawerContext } from '../../contexts/DrawerContext';
import { deleteLeaveById, batchDeleteLeave } from '../../redux/thunks/leave';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function DeleteDrawer(props) {
    const { selected, refresh } = props;
    const { closeDrawer } = useContext(DrawerContext);

    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(deleteLeaveById(selected[0], () => {
                refresh();
                closeDrawer();
            }))
        } else {
            dispatch(batchDeleteLeave(selected, () => {
                refresh();
                closeDrawer();
            }))
        }
    }, [closeDrawer, dispatch, refresh, selected])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Delete Employee</Typography>
            <Typography variant="body1" fontWeight="bold">Deleting ID(s): </Typography>
            <Typography variant="body2" fontWeight="bold">{selected.map(el => `${el}, `)}</Typography>
            <Button
                disableRipple
                startIcon={<DeleteIcon />}
                size="small"
                color="inherit"
                onClick={handleSubmit}
            >
                Delete
            </Button>
        </Stack>
    )
}

export default DeleteDrawer;