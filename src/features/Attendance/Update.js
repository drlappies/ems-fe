import { useState, useContext, useCallback } from 'react';
import { DrawerContext } from '../../contexts/DrawerContext';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { putAttendanceById, updateManyByIds } from '../../redux/thunks/attendance';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DatePicker from '../../components/DatePicker/DatePicker';
import TimePicker from '../../components/TimePicker/TimePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import UpdateIcon from '@mui/icons-material/Update';

function UpdateDrawer(props) {
    const { selected, refresh } = props;
    const { closeDrawer } = useContext(DrawerContext)
    const dispatch = useDispatch();
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [status, handleStatusChange] = useInput("")

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(putAttendanceById(selected[0], startTime?.format("HH:mm:ss"), endTime?.format("HH:mm:ss"), status, () => {
                closeDrawer()
                refresh()
            }))
        } else {
            dispatch(updateManyByIds(selected, startTime?.format("HH:mm:ss"), endTime?.format("HH:mm:ss"), status, () => {
                closeDrawer()
                refresh()
            }))
        }
    }, [closeDrawer, dispatch, endTime, refresh, selected, startTime, status])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Update Attendance</Typography>
            {selected.length <= 1 &&
                <DatePicker
                    value={date}
                    onChange={setDate}
                    size="small"
                    label="Date"
                    variant="standard"
                    fullWidth
                />}

            <TimePicker
                label="Check In"
                value={startTime}
                onChange={setStartTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <TimePicker
                label="Check Out"
                value={endTime}
                onChange={setEndTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <TextField
                size="small"
                variant="standard"
                label="Status"
                select
                value={status}
                onChange={handleStatusChange}
            >
                <MenuItem value="on_time">On-Time</MenuItem>
                <MenuItem value="late">Late</MenuItem>
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