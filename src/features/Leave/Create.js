import { useContext, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DrawerContext } from '../../contexts/DrawerContext'
import { postLeave } from "../../redux/thunks/leave"
import useInput from '../../hooks/useInput'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from '../../components/DatePicker/DatePicker'
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';


function CreateDrawer(props) {
    const { refresh } = props;
    const { closeDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch()
    const [employeeId, handleEmployeeIdChange] = useInput("")
    const employeeList = useSelector(state => state.employee.employeeList)
    const [leaveType, handleLeaveTypeChange] = useInput("personal")
    const [span, handleSpanChange] = useInput("full_day")
    const [date, setDate] = useState(null)
    const [remark, handleRemarkChange] = useInput("")
    const [status, handleStatusChange] = useInput("pending")

    const handleSubmit = useCallback(() => {
        dispatch(postLeave(employeeId, leaveType, span, date, status, remark, () => {
            refresh();
            closeDrawer();
        }))
    }, [closeDrawer, date, dispatch, employeeId, leaveType, refresh, remark, span, status])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Create Leave</Typography>
            <TextField
                size="small"
                variant="standard"
                label="Employee"
                select
                value={employeeId}
                onChange={handleEmployeeIdChange}
            >
                {employeeList.map(employee => <MenuItem key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</MenuItem>)}
            </TextField>
            <TextField
                size="small"
                variant="standard"
                label="Type"
                select
                value={leaveType}
                onChange={handleLeaveTypeChange}
            >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
            </TextField>
            <TextField
                size="small"
                variant="standard"
                label="Span"
                select
                value={span}
                onChange={handleSpanChange}
            >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="full_day">Full day</MenuItem>
                <MenuItem value="half_day">Half day</MenuItem>
            </TextField>
            <TextField
                size="small"
                variant="standard"
                label="Status"
                select
                value={status}
                onChange={handleStatusChange}
            >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
            <DatePicker
                value={date}
                onChange={setDate}
                label="Date"
                fullWidth={false}
                variant="standard"
            />
            <TextField
                size="small"
                variant="standard"
                label="Remark"
                value={remark}
                onChange={handleRemarkChange}
                multiline
                minRows={3}
                maxRows={3}
            />
            <Button
                disableRipple
                startIcon={<CreateIcon />}
                size="small"
                color="inherit"
                onClick={handleSubmit}
            >
                Create
            </Button>
        </Stack>
    )
}

export default CreateDrawer