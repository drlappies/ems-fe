import { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeave, postLeave, putLeaveById, batchUpdateLeave, deleteLeaveById, batchDeleteLeave } from '../../redux/thunks/leave';
import { networkStatus } from '../../constants/network'
import DatePicker from '../../components/DatePicker/DatePicker';
import useInput from '../../hooks/useInput';
import Table from '../../components/Table/Table';
import useTable from '../../components/Table/useTable';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DrawerContext } from '../../contexts/DrawerContext'
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'employee_id', label: 'Employee ID' },
    { id: 'firstname', label: 'firstname' },
    { id: 'lastname', label: 'lastname' },
    { id: 'date', label: 'Date' },
    { id: 'span', label: "Span" },
    { id: 'leave_type', label: 'Type' },
    { id: 'status', label: 'Status' },
]

function LeavePage() {
    const { openDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();
    const leaveList = useSelector(state => state.leave.leaveList);
    const leaveListCount = useSelector(state => state.leave.leaveListCount)
    const getLeaveStatus = useSelector(state => state.leave.getLeaveStatus)
    const employeeList = useSelector(state => state.employee.employeeList)
    const [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage] = useTable(leaveList)
    const [search, handleSearchChange] = useInput("")
    const [employeeId, handleEmployeeIdChange] = useInput("any")
    const [leaveType, handleLeaveTypeChange] = useInput("any")
    const [status, handleStatusChange] = useInput("any")
    const [span, handleSpanChange] = useInput("any")
    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const refresh = useCallback(() => {
        dispatch(getLeave(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, status, leaveType, span, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")));
    }, [dispatch, employeeId, leaveType, maxDate, minDate, order, orderBy, page, rowsPerPage, search, span, status])

    useEffect(() => {
        dispatch(getLeave(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, status, leaveType, span, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")));
    }, [dispatch, employeeId, leaveType, maxDate, minDate, order, orderBy, page, rowsPerPage, search, span, status])

    return (
        <>
            <Typography variant="h5" fontWeight="bold" sx={{ margin: "10px", marginLeft: 0 }}>Leave</Typography>
            <Stack spacing={1}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <TextField
                        sx={{ width: 300 }}
                        size="small"
                        variant="standard"
                        label="Search"
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <TextField
                        sx={{ width: 150 }}
                        size="small"
                        variant="standard"
                        label="Employee"
                        select
                        value={employeeId}
                        onChange={handleEmployeeIdChange}
                    >
                        <MenuItem value="any">Any</MenuItem>
                        {employeeList.map(employee => <MenuItem key={employee.id} value={employee.id}>{employee.firstname} {employee.lastname}</MenuItem>)}
                    </TextField>
                    <TextField
                        sx={{ width: 150 }}
                        size="small"
                        variant="standard"
                        label="Status"
                        select
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="any">Any</MenuItem>
                        <MenuItem value="pending">Personal</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </TextField>
                    <TextField
                        sx={{ width: 150 }}
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
                        sx={{ width: 150 }}
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
                </Stack>
                <Stack direction="row" spacing={3} alignItems="center">
                    <DatePicker
                        sx={{ width: 150 }}
                        value={minDate}
                        onChange={setMinDate}
                        label="Min Date"
                        fullWidth={false}
                        variant="standard"
                    />
                    <DatePicker
                        sx={{ width: 150 }}
                        value={maxDate}
                        onChange={setMaxDate}
                        label="Max Date"
                        fullWidth={false}
                        variant="standard"
                    />
                </Stack>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Button
                        disableRipple
                        startIcon={<CreateIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<CreateDrawer refresh={refresh} />)}
                    >
                        Create
                    </Button>
                    <Button
                        disableRipple
                        startIcon={<UpdateIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<UpdateDrawer selected={selected} refresh={refresh} />)}
                        disabled={selected.length < 1}
                    >
                        Update
                    </Button>
                    <Button
                        disableRipple
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<DeleteDrawer selected={selected} refresh={refresh} />)}
                        disabled={selected.length < 1}
                    >
                        Delete
                    </Button>
                </Stack>
            </Stack>
            <Table
                selectable
                loading={getLeaveStatus === networkStatus.FETCH_IN_PROGRESS}
                error={getLeaveStatus === networkStatus.FETCH_FAILED}
                orderBy={orderBy}
                order={order}
                selected={selected}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 25, 100]}
                onSelectAll={handleSelectAllClick}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onRequestSort={handleRequestSort}
                columns={columns}
                rows={leaveList}
                count={leaveListCount}
                onSelectAllClick={handleSelectAllClick}
                onSelect={handleClick}
            />
        </>
    )
}

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

export default LeavePage