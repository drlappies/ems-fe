import { useState, useEffect, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPayroll } from '../../redux/thunks/payroll';
import { networkStatus } from '../../constants/network';
import { DrawerContext } from '../../contexts/DrawerContext';
import useInput from '../../hooks/useInput';
import Table from '../../components/Table/Table';
import useTable from '../../components/Table/useTable'
import DatePicker from '../../components/DatePicker/DatePicker';
import Create from '../../features/Payroll/Create';
import Update from '../../features/Payroll/Update'
import Delete from '../../features/Payroll/Delete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
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
    { id: 'date_from', label: 'From' },
    { id: 'date_to', label: 'To' },
    { id: 'payday', label: 'Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'status', label: 'Status' },
]

function PayrollTable() {
    const { openDrawer } = useContext(DrawerContext);
    const dispatch = useDispatch();
    const getPayrollStatus = useSelector(state => state.payroll.getPayrollStatus)
    const payrollList = useSelector(state => state.payroll.payrollList)
    const payrollListCount = useSelector(state => state.payroll.payrollListCount)
    const employeeList = useSelector(state => state.employee.employeeList)
    const [orderBy, order, selected, page, rowsPerPage, handleRequestSort, handleSelectAllClick, handleClick, handleChangePage, handleChangeRowsPerPage] = useTable(payrollList)
    const [search, handleSearchChange] = useInput("")
    const [employeeId, handleEmployeeIdChange] = useInput("any")
    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)
    const [status, handleStatusChange] = useInput("any")

    const refresh = useCallback(() => {
        dispatch(getPayroll(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD"), status));
    }, [dispatch, employeeId, maxDate, minDate, order, orderBy, page, rowsPerPage, search, status])

    useEffect(() => {
        dispatch(getPayroll(page * rowsPerPage, rowsPerPage, orderBy, order, search, employeeId, minDate?.format("YYYY-MM-DD"), maxDate?.format("YYYY-MM-DD"), status));
    }, [dispatch, employeeId, maxDate, minDate, order, orderBy, page, rowsPerPage, search, status])

    return (
        <>
            <Stack spacing={1}>
                <Stack direction="row" spacing={3}>
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
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
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
                        onClick={() => openDrawer(<Update refresh={refresh} selected={selected} />)}
                        disabled={selected.length < 1}
                    >
                        Update
                    </Button>
                    <Button
                        disableRipple
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="inherit"
                        onClick={() => openDrawer(<Delete refresh={refresh} selected={selected} />)}
                        disabled={selected.length < 1}
                    >
                        Delete
                    </Button>
                </Stack>
            </Stack>
            <Table
                selectable
                loading={getPayrollStatus === networkStatus.FETCH_IN_PROGRESS}
                error={getPayrollStatus === networkStatus.FETCH_FAILED}
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
                rows={payrollList}
                count={payrollListCount}
                onSelectAllClick={handleSelectAllClick}
                onSelect={handleClick}
            />
        </>
    )
}

export default PayrollTable