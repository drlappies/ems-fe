import TextField from "@mui/material/TextField";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function DatePicker(props) {
    const { onChange, value, fullWidth, error, size, margin, label, disabled } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MuiDatePicker
                renderInput={(params) => (
                    <TextField
                        disabled={disabled}
                        label={label}
                        {...params}
                        size={size}
                        fullWidth={fullWidth}
                        margin={margin}
                        error={error}
                    />
                )}
                onChange={onChange}
                value={value}
            />
        </LocalizationProvider>
    );
}

DatePicker.defaultProps = {
    fullWidth: true,
    size: "normal",
    margin: "none"
}

export default DatePicker;
