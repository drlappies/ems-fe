import TextField from '@mui/material/TextField';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker';

function TimePicker(props) {
    const { label, value, onChange, size, fullWidth, margin, error, variant } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MUITimePicker
                label={label}
                value={value}
                onChange={onChange}
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes', 'seconds']}
                mask="__:__:__"
                inputFormat="HH:mm:ss"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size={size}
                        fullWidth={fullWidth}
                        margin={margin}
                        error={error}
                        variant={variant}
                    />
                )}
            />
        </LocalizationProvider>
    );
}

TimePicker.defaultProps = {
    fullWidth: true,
    size: "normal",
    margin: "none"
}

export default TimePicker;