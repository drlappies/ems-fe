import { getYearSelect } from '../../utils/datetime'
import { months } from '../../constants/datetime'
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const years = getYearSelect();

function CalendarTimePicker(props) {
    const { year, month, onChangeYear, onChangeMonth, onNext, onPrev, onReset } = props;

    return (
        <Stack direction="row" alignItems="center" gap="10px">
            <TextField
                onChange={onChangeMonth}
                value={month}
                select
                size="small"
                margin="none"
                variant="standard"
                sx={{ width: "100px" }}
            >
                {months.map((el, i) => (
                    <MenuItem key={i} value={i}>
                        {el}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                onChange={onChangeYear}
                value={year}
                select
                size="small"
                margin="none"
                variant="standard"
                sx={{ width: "100px" }}
            >
                {years.map((el, i) => (
                    <MenuItem key={i} value={el}>
                        {el}
                    </MenuItem>
                ))}
            </TextField>
            <IconButton onClick={onPrev}>
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton onClick={onNext}>
                <NavigateNextIcon />
            </IconButton>
            <IconButton onClick={onReset}>
                <RestartAltIcon />
            </IconButton>
        </Stack>
    )
}

export default CalendarTimePicker