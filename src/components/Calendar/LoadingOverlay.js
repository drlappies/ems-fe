import CircularProgress from '@mui/material/CircularProgress';

function LoadingOverlay(props) {
    const { isVisible } = props;

    if (!isVisible) return null;

    return (
        <div className="calendar--overlay-blocked">
            <CircularProgress color="inherit" />
        </div>
    )
}

export default LoadingOverlay