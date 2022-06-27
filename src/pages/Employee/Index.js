import { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchUpdateEmployee, getEmployeeTable, postEmployee, putEmployeeById, deleteEmployeeById, batchDeleteEmployee } from '../../redux/thunks/employee';
import { DrawerContext } from '../../contexts/DrawerContext'
import { networkStatus } from '../../constants/network';
import useTable from '../../components/Table/useTable';
import Table from '../../components/Table/Table'
import useInput from '../../hooks/useInput';
import Header from '../../components/Header/Header';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import DatePicker from '../../components/DatePicker/DatePicker';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TimePicker from '../../components/TimePicker/TimePicker';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'firstname', label: 'Firstname' },
    { id: 'lastname', label: 'Lastname' },
    { id: 'start_work_time', label: 'Start work time' },
    { id: 'end_work_time', label: 'End work time' },
    { id: 'joined_date', label: "Joined At" },
    { id: 'monthly_salary', label: "Salary" },
    { id: 'role', label: "Role" },
    { id: 'status', label: 'Status' },
]

function EmployeePage() {
    const { openDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();
    const employeeTable = useSelector(state => state.employee.employeeTable);
    const getEmployeeTableStatus = useSelector(state => state.employee.getEmployeeTableStatus)
    const employeeTableCount = useSelector(state => state.employee.employeeTableCount);
    const [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage] = useTable(employeeTable);
    const [search, handleSearchChange] = useInput("")
    const [role, handleRoleChange] = useInput("any")
    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const refresh = useCallback(() => {
        dispatch(getEmployeeTable(page * rowsPerPage, rowsPerPage, orderBy, order, search, role, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")))
    }, [dispatch, maxDate, minDate, order, orderBy, page, role, rowsPerPage, search])

    useEffect(() => {
        dispatch(getEmployeeTable(page * rowsPerPage, rowsPerPage, orderBy, order, search, role, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD")))
    }, [dispatch, maxDate, minDate, order, orderBy, page, role, rowsPerPage, search])

    return (
        <>
            <Header text="Employee" />
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
                        value={role}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="any">Any</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
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
                loading={getEmployeeTableStatus === networkStatus.FETCH_IN_PROGRESS}
                error={getEmployeeTableStatus === networkStatus.FETCH_FAILED}
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
                rows={employeeTable}
                count={employeeTableCount}
                onSelectAllClick={handleSelectAllClick}
                onSelect={handleClick}
            />
        </>
    )
}

function CreateDrawer(props) {
    const { refresh } = props;
    const dispatch = useDispatch();
    const { closeDrawer } = useContext(DrawerContext);
    const [username, handleUsernameChange] = useInput("")
    const [password, handlePasswordChange] = useInput("")
    const [firstname, handleFirstnameChange] = useInput("")
    const [lastname, handleLastnameChange] = useInput("")
    const [startWorkTime, setStartWorkTime] = useState(null)
    const [endWorkTime, setEndWorkTime] = useState(null)
    const [joinedDate, setJoinedDate] = useState(null)
    const [monthlySalary, handleMonthlySalaryChange] = useInput("")
    const [role, handleRoleChange] = useInput("user")

    const handleSubmit = useCallback(() => {
        dispatch(postEmployee(username, password, firstname, lastname, startWorkTime?.format("HH:mm:ss"), endWorkTime?.format("HH:mm:ss"), joinedDate?.format("YYYY-MM-DD"), monthlySalary, role, () => {
            closeDrawer()
            refresh();
        }))
    }, [closeDrawer, dispatch, endWorkTime, firstname, joinedDate, lastname, monthlySalary, password, refresh, role, startWorkTime, username])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Create Employee</Typography>
            <TextField
                size="small"
                variant="standard"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Firstname"
                value={firstname}
                onChange={handleFirstnameChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Lastname"
                value={lastname}
                onChange={handleLastnameChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Monthly Salary"
                value={monthlySalary}
                onChange={handleMonthlySalaryChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Role"
                value={role}
                select
                onChange={handleRoleChange}
                fullWidth
            >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <TimePicker
                label="Start Working Time"
                value={startWorkTime}
                onChange={setStartWorkTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <TimePicker
                label="End Working Time"
                value={endWorkTime}
                onChange={setEndWorkTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <DatePicker
                value={joinedDate}
                onChange={setJoinedDate}
                label="Joined at"
                fullWidth={false}
                variant="standard"
            />
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

function UpdateDrawer(props) {
    const { refresh, selected } = props;
    const dispatch = useDispatch();
    const { closeDrawer } = useContext(DrawerContext);
    const [username, handleUsernameChange] = useInput("")
    const [password, handlePasswordChange] = useInput("")
    const [firstname, handleFirstnameChange] = useInput("")
    const [lastname, handleLastnameChange] = useInput("")
    const [startWorkTime, setStartWorkTime] = useState(null)
    const [endWorkTime, setEndWorkTime] = useState(null)
    const [joinedDate, setJoinedDate] = useState(null)
    const [monthlySalary, handleMonthlySalaryChange] = useInput("")
    const [role, handleRoleChange] = useInput("user")

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(putEmployeeById(selected[0], username, password, firstname, lastname, startWorkTime?.format("HH:mm:ss"), endWorkTime?.format("HH:mm:ss"), joinedDate?.format("YYYY-MM-DD"), monthlySalary, role, () => {
                closeDrawer()
                refresh();
            }))
        } else {
            dispatch(batchUpdateEmployee(selected, startWorkTime?.format("HH:mm:ss"), endWorkTime?.format("HH:mm:ss"), joinedDate?.format("YYYY-MM-DD"), monthlySalary, role, () => {
                closeDrawer()
                refresh();
            }))
        }
    }, [closeDrawer, dispatch, endWorkTime, firstname, joinedDate, lastname, monthlySalary, password, refresh, role, selected, startWorkTime, username])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Update Employee</Typography>
            {selected.length <= 1 && <>
                <TextField
                    size="small"
                    variant="standard"
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    fullWidth
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    fullWidth
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="Firstname"
                    value={firstname}
                    onChange={handleFirstnameChange}
                    fullWidth
                />
                <TextField
                    size="small"
                    variant="standard"
                    label="Lastname"
                    value={lastname}
                    onChange={handleLastnameChange}
                    fullWidth
                />
                <DatePicker
                    value={joinedDate}
                    onChange={setJoinedDate}
                    label="Joined at"
                    fullWidth={false}
                    variant="standard"
                />
            </>}

            <TimePicker
                label="Start Working Time"
                value={startWorkTime}
                onChange={setStartWorkTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <TimePicker
                label="End Working Time"
                value={endWorkTime}
                onChange={setEndWorkTime}
                size="small"
                fullWidth
                variant="standard"
            />
            <TextField
                size="small"
                variant="standard"
                label="Monthly Salary"
                value={monthlySalary}
                onChange={handleMonthlySalaryChange}
                fullWidth
            />
            <TextField
                size="small"
                variant="standard"
                label="Role"
                value={role}
                select
                onChange={handleRoleChange}
                fullWidth
            >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <LoadingButton
                disableRipple
                color="inherit"
                startIcon={<UpdateIcon />}
                onClick={handleSubmit}
            >
                UPDATE
            </LoadingButton>
        </Stack>
    )
}

function DeleteDrawer(props) {
    const { selected, refresh } = props;
    const { closeDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        if (selected.length <= 1) {
            dispatch(deleteEmployeeById(selected[0], () => {
                closeDrawer();
                refresh();
            }))
        } else {
            dispatch(batchDeleteEmployee(selected, () => {
                closeDrawer();
                refresh();
            }))
        }
    }, [closeDrawer, dispatch, refresh, selected])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Delete Employee</Typography>
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

export default EmployeePage