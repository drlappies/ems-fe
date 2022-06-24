import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function NavItem(props) {
    const { to, icon, text } = props;
    const pathname = useSelector(state => state.router.location.pathname)

    return (
        <ListItem button component={NavLink} to={to} selected={pathname === to} disableRipple>
            <ListItemIcon >
                {icon}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    )
}

export default NavItem