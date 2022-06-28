import { useContext, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { postEmployee } from '../../redux/thunks/employee'
import useInput from '../../hooks/useInput'
import { DrawerContext } from '../../contexts/DrawerContext'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TimePicker from '../../components/TimePicker/TimePicker'
import DatePicker from '../../components/DatePicker/DatePicker'
import LoadingButton from '@mui/lab/LoadingButton';
import CreateIcon from '@mui/icons-material/Create';


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

export default CreateDrawer