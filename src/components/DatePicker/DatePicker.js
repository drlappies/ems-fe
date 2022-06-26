import TextField from "@mui/material/TextField";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function DatePicker(props) {
    const { sx, onChange, value, fullWidth, error, size, margin, label, disabled, variant } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MuiDatePicker
                renderInput={(params) => (
                    <TextField
                        sx={sx}
                        disabled={disabled}

                        {...params}
                        size={size}
                        fullWidth={fullWidth}
                        margin={margin}
                        error={error}
                        variant={variant}
                    />
                )}
                label={label}
                onChange={onChange}
                value={value}
            />
        </LocalizationProvider>
    );
}

DatePicker.defaultProps = {
    fullWidth: false,
    size: "none",
    margin: "none"
}

export default DatePicker;
