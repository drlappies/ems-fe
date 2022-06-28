import { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerContext } from '../../contexts/DrawerContext'
import { networkStatus } from '../../constants/network';
import { getAttendance } from '../../redux/thunks/attendance';
import useInput from '../../hooks/useInput';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import useTable from '../../components/Table/useTable'
import DatePicker from '../../components/DatePicker/DatePicker';
import Create from '../../features/Attendance/Create';
import Delete from '../../features/Attendance/Delete';
import Update from '../../features/Attendance/Update';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


const columns = [
    { id: 'id', label: 'ID' },
    { id: 'employee_id', label: 'Employee ID' },
    { id: 'firstname', label: 'Firstname' },
    { id: 'lastname', label: 'Lastname' },
    { id: 'date', label: 'Date' },
    { id: 'check_in_time', label: 'Check In Time' },
    { id: 'check_out_time', label: 'Check Out Time' },
    { id: 'status', label: 'Status' },
]

function AttendancePage() {
    const { openDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();
    const attdList = useSelector(state => state.attendance.attdList)
    const attdListCount = useSelector(state => state.attendance.attdListCount)
    const getAttdStatus = useSelector(state => state.attendance.getAttdStatus)
    const employeeList = useSelector(state => state.employee.employeeList)
    const [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage] = useTable(attdList);
    const [search, handleSearchChange] = useInput("")
    const [employeeId, handleEmployeeIdChange] = useInput("any")
    const [attdStatus, handleAttdStatusChange] = useInput("any")
    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const refresh = useCallback(() => {
        dispatch(getAttendance(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, attdStatus, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")))
    }, [attdStatus, dispatch, employeeId, maxDate, minDate, order, orderBy, page, rowsPerPage, search])

    useEffect(() => {
        dispatch(getAttendance(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, attdStatus, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")))
    }, [attdStatus, dispatch, employeeId, maxDate, minDate, order, orderBy, page, rowsPerPage, search])

    return (
        <>
            <Header text="Attendance" />
            <Stack spacing={1}>
                <Stack direction="row" spacing={3} alignItems='center'>
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
                        value={attdStatus}
                        onChange={handleAttdStatusChange}
                    >
                        <MenuItem value="any">Any</MenuItem>
                        <MenuItem value="on_time">On-Time</MenuItem>
                        <MenuItem value="late">Late</MenuItem>
                    </TextField>
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
                <Stack direction="row" spacing={3}>
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
                loading={getAttdStatus === networkStatus.FETCH_IN_PROGRESS}
                error={getAttdStatus === networkStatus.FETCH_FAILED}
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
                rows={attdList}
                count={attdListCount}
                onSelectAllClick={handleSelectAllClick}
                onSelect={handleClick}
            />
        </>
    )
}

export default AttendancePage