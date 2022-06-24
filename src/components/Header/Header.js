
import Typography from '@mui/material/Typography';

function Header(props) {
    const { text } = props;

    return (
        <Typography variant="h5" fontWeight="bold" sx={{ margin: "10px" }}>{text}</Typography>
    )
}

export default Header