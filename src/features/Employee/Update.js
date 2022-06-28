import { useContext, useState, useCallback } from 'react';
import { useDispatch, } from 'react-redux'
import { DrawerContext } from '../../contexts/DrawerContext'
import { putEmployeeById, batchUpdateEmployee } from '../../redux/thunks/employee';
import useInput from '../../hooks/useInput'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DatePicker from '../../components/DatePicker/DatePicker';
import TimePicker from '../../components/TimePicker/TimePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import UpdateIcon from '@mui/icons-material/Update';

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

export default UpdateDrawer;