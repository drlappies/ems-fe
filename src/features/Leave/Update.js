import { useContext, useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux";
import { DrawerContext } from "../../contexts/DrawerContext"
import { putLeaveById, batchUpdateLeave } from "../../redux/thunks/leave";
import useInput from '../../hooks/useInput'
import DatePicker from '../../components/DatePicker/DatePicker'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';


function UpdateDrawer(props) {
    const { refresh, selected } = props;
    const { closeDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();
    const leaveList = useSelector(state => state.leave.leaveList)
    const leave = leaveList.find(leave => leave.id.toString() === selected[0])
    const [leaveType, handleLeaveTypeChange] = useInput(selected.length <= 1 ? leave.leave_type : "")
    const [span, handleSpanChange] = useInput(selected.length <= 1 ? leave.span : "")
    const [date, setDate] = useState(selected.length <= 1 ? leave.date : null)
    const [remark, handleRemarkChange] = useInput(selected.length <= 1 ? leave.remark : "")
    const [status, handleStatusChange] = useInput(selected.length <= 1 ? leave.status : "")

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(putLeaveById(selected[0], { leave_type: leaveType, span: span, date: date, remark: remark, status: status }, () => {
                refresh();
                closeDrawer();
            }))
        } else {
            dispatch(batchUpdateLeave(selected, { leave_type: leaveType, span: span, date: date, remark: remark, status: status }, () => {
                refresh();
                closeDrawer();
            }))
        }
    }, [closeDrawer, date, dispatch, leaveType, refresh, remark, selected, span, status])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Update Leave</Typography>
            <TextField
                size="small"
                variant="standard"
                label="Type"
                select
                value={leaveType}
                onChange={handleLeaveTypeChange}
            >
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
                startIcon={< UpdateIcon />}
                size="small"
                color="inherit"
                onClick={handleSubmit}
            >
                Update
            </Button>
        </Stack>
    )
}

export default UpdateDrawer