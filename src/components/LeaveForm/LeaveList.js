import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function LeaveList(props) {
    const { list, onDelete } = props;

    return (
        <List sx={{ height: "135px", maxHeight: "135px", overflow: "auto" }} dense>
            {list.map((leave) => {
                return (
                    <ListItem secondaryAction={
                        <IconButton onClick={() => onDelete(leave.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText primary={leave.date.format("YYYY-MM-DD")} secondary={`${leave.span} - ${leave.leave_type}`} />
                    </ListItem>
                )
            })}
        </List>
    )
}

LeaveList.defaultProps = {
    list: []
}

export default LeaveList