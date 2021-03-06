import { useSelector } from 'react-redux'
import NavItem from "./NavItem";
import NavList from "./NavList"
import NavProfile from "./NavProfile";
import NavButton from "./NavButton"
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
    const user = useSelector(state => state.user.user)

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <NavList component="nav">
            <NavProfile />
            <Divider />
            <NavItem to="/dashboard" icon={<DashboardIcon />} text={"Dashboard"} />
            <NavItem to="/user" icon={<PersonOutlineIcon />} text={"User"} />
            <NavItem to="/attendance/check_in" icon={<PunchClockIcon />} text={"Punch Card"} />
            <NavItem to="/leave/apply" icon={<SickOutlinedIcon />} text={"Leave Application"} />
            <Divider />
            {user.role === "admin" &&
                <>
                    <NavItem to="/attendance" icon={<AccessTimeIcon />} text={"Attendance"} />
                    <NavItem to="/employee" icon={<PeopleOutlineOutlinedIcon />} text={"Employee"} />
                    <NavItem to="/leave" icon={<SickOutlinedIcon />} text={"Leave"} />
                    <NavItem to="/payroll" icon={<AttachMoneyIcon />} text={"Payroll"} />
                </>}
            <NavButton icon={<LogoutIcon />} text={"Logout"} onClick={handleLogout} />
        </NavList>
    )
}

export default Navbar