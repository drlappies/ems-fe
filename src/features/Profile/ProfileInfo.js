import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function ProfileInfo(props) {
    const { label, value } = props;

    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={label}
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {value ? value : "Unapplicable"}
                    </Typography>
                }
            />
        </ListItem>
    )
}

export default ProfileInfo