import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

function NavProfile() {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText
                primary="Firstname Lastname"
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="lightgrey"
                        >
                            id: 0 admin
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default NavProfile