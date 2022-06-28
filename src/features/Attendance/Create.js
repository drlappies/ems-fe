import { useContext, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput'
import { DrawerContext } from '../../contexts/DrawerContext';
import { postAttendance } from '../../redux/thunks/attendance';
import TimePicker from '../../components/TimePicker/TimePicker'
import DatePicker from '../../components/DatePicker/DatePicker'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';

function CreateDrawer(props) {
    const { refresh } = props;
    const dispatch = useDispatch()
    const { closeDrawer } = useContext(DrawerContext)
    const employeeList = useSelector(state => state.employee.employeeList)
    const [employeeId, handleEmployeeIdChange] = useInput("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [status, handleStatusChange] = useInput("")

    const handleSubmit = useCallback(() => {
        dispatch(postAttendance(employeeId, date, startTime?.format("HH:mm:ss"), endTime?.format("HH:mm:ss"), status, () => {
            closeDrawer()
            refresh();
        }))
    }, [closeDrawer, date, dispatch, employeeId, endTime, refresh, startTime, status])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Create Attendance</Typography>
            <TextField
                size="small"
                variant="standard"
                label="Employee"
                select
                value={employeeId}
                onChange={handleEmployeeIdChange}
                fullWidth
            >
                {employeeList.map(employee => <MenuItem key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</MenuItem>)}
            </TextField>
            <DatePicker
                value={date}
                onChange={setDate}
                size="small"
                label="Date"
                variant="standard"
                fullWidth
            />
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
                startIcon={<CreateIcon />}
                onClick={handleSubmit}
            >
                Create
            </LoadingButton>
        </Stack>

    )
}

export default CreateDrawer