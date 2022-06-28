import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Clock from "react-live-clock";
import { networkStatus } from '../../constants/network';
import { getUserCheckInStatus, postAttdCheckIn, postAttdCheckOut } from '../../redux/thunks/attendance';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Punch() {
    const hasUserCheckedIn = useSelector(state => state.attendance.hasUserCheckedIn)
    const hasUserCheckedOut = useSelector(state => state.attendance.hasUserCheckedOut)
    const userCheckInTime = useSelector(state => state.attendance.userCheckInTime)
    const userCheckOutTime = useSelector(state => state.attendance.userCheckOutTime)
    const postAttdCheckInStatus = useSelector(state => state.attendance.postAttdCheckInStatus)
    const postAttdCheckOutStatus = useSelector(state => state.attendance.postAttdCheckOutStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserCheckInStatus());
    }, [dispatch]);

    return (
        <Stack spacing={2}>
            <Typography variant="h3">
                <Clock format={"HH:mm:ss"} ticking={true} />
            </Typography>
            <List>
                <ListItem secondaryAction={
                    <LoadingButton
                        loading={postAttdCheckInStatus === networkStatus.FETCH_IN_PROGRESS}
                        disabled={hasUserCheckedIn}
                        disableRipple
                        sx={{ color: "#444950" }}
                        startIcon={<AlarmAddIcon />}
                        onClick={() => dispatch(postAttdCheckIn())}
                    >
                        Check in
                    </LoadingButton>
                }>
                    <ListItemText primary="Check in time" secondary={hasUserCheckedIn ? userCheckInTime : "You have not checked in for today yet!"} />
                </ListItem>
                <ListItem secondaryAction={
                    <LoadingButton
                        loading={postAttdCheckOutStatus === networkStatus.FETCH_IN_PROGRESS}
                        disabled={hasUserCheckedOut}
                        disableRipple
                        sx={{ color: "#444950" }}
                        startIcon={<AlarmOffIcon />}
                        onClick={() => dispatch(postAttdCheckOut())}
                    >
                        Check out
                    </LoadingButton>
                }>
                    <ListItemText primary="Check out time" secondary={hasUserCheckedOut ? userCheckOutTime : "You have not checked out for today yet!"} />
                </ListItem>
            </List>
        </Stack>
    )
}

export default Punch