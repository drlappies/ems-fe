import React from 'react';
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

function NavProfile() {
    const user = useSelector(state => state.user.user)

    return (
        <ListItem disableRipple alignItems="flex-start">
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary={user.firstname + " " + user.lastname}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', textTransform: "capitalize" }}
                            component="span"
                            variant="body2"
                            color="lightgrey"
                        >
                            {user.role}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default NavProfile