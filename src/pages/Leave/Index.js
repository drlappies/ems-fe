import { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeave } from '../../redux/thunks/leave';
import { networkStatus } from '../../constants/network'
import DatePicker from '../../components/DatePicker/DatePicker';
import useInput from '../../hooks/useInput';
import Table from '../../components/Table/Table';
import useTable from '../../components/Table/useTable';
import Create from '../../features/Leave/Create'
import Update from '../../features/Leave/Update'
import Delete from '../../features/Leave/Delete'
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
                        onClick={() => openDrawer(<Create refresh={refresh} />)}
                    >
                        Create
                    </Button>
                    <Button
                        disableRipple
                        startIcon={<UpdateIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<Update selected={selected} refresh={refresh} />)}
                        disabled={selected.length < 1}
                    >
                        Update
                    </Button>
                    <Button
                        disableRipple
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<Delete selected={selected} refresh={refresh} />)}
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


export default LeavePage