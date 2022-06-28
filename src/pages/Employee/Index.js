import { useEffect, useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeTable } from '../../redux/thunks/employee';
import { DrawerContext } from '../../contexts/DrawerContext'
import { networkStatus } from '../../constants/network';
import useTable from '../../components/Table/useTable';
import Table from '../../components/Table/Table'
import useInput from '../../hooks/useInput';
import Header from '../../components/Header/Header';
import Create from '../../features/Employee/Create';
import Delete from '../../features/Employee/Delete';
import Update from '../../features/Employee/Update';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import DatePicker from '../../components/DatePicker/DatePicker';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

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

export default EmployeePage