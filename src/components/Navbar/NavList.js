import List from "@mui/material/List";
import { styled } from '@mui/material/styles';

const NavList = styled(List)({
    width: 250,
    minWidth: 250,
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    color: "#ffffff",
    backgroundColor: "#444950",
    paddingLeft: "10px",
    paddingRight: "10px",
    "& .MuiListItem-root": {
        marginBottom: 5,
        borderRadius: "15px",
        '&:hover': {
            backgroundColor: "rgba(135, 123, 255, 0.3)"
        },
    },
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: "#ffffff"
    },
    '& 	.Mui-selected': {
        borderRadius: "15px",
        backgroundColor: "rgba(135, 123, 255, 0.8)",
        '&:hover': {
            backgroundColor: "rgba(135, 123, 255,1)"
        },
    },
})


export default NavList