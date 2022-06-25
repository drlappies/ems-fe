import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ProfileInfo from './ProfileInfo';
import moment from 'moment'

function Profile() {
    const user = useSelector(state => state.user.user);

    return (
        <List>
            <ProfileInfo label="First Name" value={user.firstname} />
            <ProfileInfo label="Last Name" value={user.lastname} />
            <ProfileInfo label="Address" value={user.address} />
            <ProfileInfo label="Role" value={user.role} />
            <ProfileInfo label="Working hours" value={`${user.start_work_time} - ${user.end_work_time}`} />
            <ProfileInfo label="Monthly Salary" value={user.monthly_salary} />
            <ProfileInfo label="Joined at" value={moment(user.joined_date).format("YYYY-MM-DD")} />

        </List>
    )
}

export default Profile