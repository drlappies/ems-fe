import Button from '@mui/material/Button';


function ErrorOverlay(props) {
    const { isVisible, onRetry } = props;

    if (!isVisible) return null;

    return (
        <div className="calendar--overlay-blocked">
            <p>Something went wrong</p>
            <Button disableRipple color="inherit" onClick={onRetry}>Retry</Button>
        </div>
    )
}

export default ErrorOverlay