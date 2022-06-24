import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function NavButton(props) {
    const { icon, text, onClick } = props;

    return (
        <ListItem button disableRipple onClick={onClick}>
            <ListItemIcon >
                {icon}
            </ListItemIcon>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    )
}

export default NavButton