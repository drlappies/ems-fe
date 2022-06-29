import { useContext, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerContext } from '../../contexts/DrawerContext'
import { postPayroll } from '../../redux/thunks/payroll'
import useInput from '../../hooks/useInput'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DatePicker from '../../components/DatePicker/DatePicker'
import CreateIcon from '@mui/icons-material/Create';
import LoadingButton from '@mui/lab/LoadingButton';


function CreateDrawer(props) {
    const { refresh } = props;
    const dispatch = useDispatch();
    const { closeDrawer } = useContext(DrawerContext);
    const employeeList = useSelector(state => state.employee.employeeList)
    const [employeeId, handleEmployeeIdChange] = useInput("")
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null);
    const [date, setDate] = useState(null)

    const handleSubmit = useCallback(() => {
        const from = dateFrom.format("YYYY-MM-DD")
        const to = dateTo.format("YYYY-MM-DD")
        const payday = date.format("YYYY-MM-DD")

        dispatch(postPayroll(employeeId, from, to, payday, () => {
            closeDrawer();
            refresh()
        }))
    }, [closeDrawer, date, dateFrom, dateTo, dispatch, employeeId, refresh])

    return (
        <Stack spacing={3}>
            <Typography variant="h6" fontWeight="bold">Create Payroll</Typography>
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
            <DatePicker
                value={dateFrom}
                onChange={setDateFrom}
                label="Date From"
                fullWidth={false}
                variant="standard"
            />
            <DatePicker
                value={dateTo}
                onChange={setDateTo}
                label="Date To"
                fullWidth={false}
                variant="standard"
            />
            <DatePicker
                value={date}
                onChange={setDate}
                label="Payday"
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

export default CreateDrawer