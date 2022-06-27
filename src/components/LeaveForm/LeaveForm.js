import { useState, useMemo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserLeave } from '../../redux/thunks/user';
import { postApplyMany } from '../../redux/thunks/leave'
import { getDatesByYearAndMonth } from '../../utils/datetime'
import { networkStatus } from '../../constants/network'
import { v4 as uuidv4 } from 'uuid';
import { renderCalendarBox } from '../../pages/Dashboard/Leave';
import moment from 'moment';
import useInput from '../../hooks/useInput';
import DatePicker from '../DatePicker/DatePicker'
import MonthlyCalendar from '../../components/Calendar/MonthlyCalendar';
import useCalendar from '../../components/Calendar/useCalendar';
import CalendarTimePicker from '../Calendar/CalendarTimePicker';
import LeaveList from './LeaveList'
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function LeaveForm() {
    const dispatch = useDispatch();
    const getLeaveListStatus = useSelector((state) => state.user.getLeaveListStatus);
    const leaveList = useSelector((state) => state.user.leaveList);
    const [leaveApp, setLeave] = useState([])
    const [date, setDate] = useState(null)
    const [remark, handleRemarkUpdate, resetRemark] = useInput("")
    const [span, handleSpanChange, resetSpan] = useInput("")
    const [type, handleTypeChange, resetType] = useInput("")
    const [month, year, next, prev, select, create, reset] = useCalendar()

    const calendar = useMemo(() => {
        const rawCalendar = create(month, year)

        for (let i = 0; i < rawCalendar.length; i++) {
            for (let j = 0; j < rawCalendar[i].length; j++) {
                const date = rawCalendar[i][j];
                if (date) {
                    const leave = leaveList.find((el) => new Date(el.date).getDate() === date.date) || leaveApp.find(el => el.date.isSame(`${year}-${(month + 1).toString().padStart(2, 0)}-${date.date.toString().padStart(2, 0)}`, 'day'))
                    if (leave) {
                        rawCalendar[i][j] = {
                            ...date,
                            leave_type: leave.leave_type,
                            status: leave.status,
                            span: leave.span,
                        }
                    }
                }
            }
        }

        return rawCalendar
    }, [create, leaveApp, leaveList, month, year])

    const resetForm = useCallback(() => {
        resetRemark()
        resetSpan()
        resetType()
        setDate(null)
    }, [resetRemark, resetSpan, resetType])

    const addLeave = useCallback(() => {
        if (!date || !span || !type) return

        if (leaveApp.find(el => el.date.isSame(date, 'day'))) return;
        if (leaveList.find(el => moment(el.date).isSame(date, 'day'))) return;

        setLeave(prevState => [...prevState, { id: uuidv4(), date: date, remark: remark, span: span, leave_type: type }])
        resetForm()
    }, [date, leaveApp, leaveList, remark, resetForm, span, type])

    const deleteLeave = ((id) => {
        setLeave(prevState => prevState.filter(leave => leave.id !== id))
    })

    const apply = useCallback(() => {
        dispatch(postApplyMany(leaveApp)).then(() => {
            resetForm()
            setLeave([])
            const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
            dispatch(getUserLeave(mindate, maxdate));
        })
    }, [dispatch, leaveApp, month, resetForm, year])

    useEffect(() => {
        const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
        dispatch(getUserLeave(mindate, maxdate));
    }, [dispatch, month, year])

    return (
        <Stack direction="row" spacing={5}>
            <Stack sx={{ width: "40%" }} spacing={2}>
                <DatePicker
                    disabled={leaveApp.length >= 5}
                    label="Date"
                    size="small"
                    fullWidth
                    value={date}
                    onChange={setDate}
                    variant="standard"
                />
                <TextField
                    disabled={leaveApp.length >= 5}
                    label="Span"
                    size="small"
                    fullWidth
                    select
                    value={span}
                    onChange={handleSpanChange}
                    variant="standard"
                >
                    <MenuItem value="full_day">Full Day</MenuItem>
                    <MenuItem value="half_day">Half Day</MenuItem>
                </TextField>
                <TextField
                    disabled={leaveApp.length >= 5}
                    label="Type"
                    size="small"
                    fullWidth
                    select
                    value={type}
                    onChange={handleTypeChange}
                    variant="standard"
                >
                    <MenuItem value="sick">Sick</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                </TextField>
                <TextField
                    disabled={leaveApp.length >= 5}
                    multiline
                    minRows={5}
                    maxRows={5}
                    label="Remarks"
                    size="small"
                    fullWidth
                    value={remark}
                    onChange={handleRemarkUpdate}
                    variant="standard"
                />
                <Button
                    disabled={leaveApp.length >= 5}
                    disableRipple
                    fullWidth
                    color="inherit"
                    onClick={addLeave}
                >
                    Add Leave
                </Button>
                <LeaveList list={leaveApp} onDelete={deleteLeave} />

                {leaveApp.length > 0 && <Button
                    disableRipple
                    fullWidth
                    color="inherit"
                    onClick={() => apply()}
                >
                    Apply
                </Button>}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack sx={{ width: "60%" }}>
                <CalendarTimePicker
                    year={year}
                    month={month}
                    onChangeYear={(e) => select(month, e.target.value)}
                    onChangeMonth={(e) => select(e.target.value, year)}
                    onNext={() => next()}
                    onPrev={() => prev()}
                    onReset={() => reset()}
                />
                <MonthlyCalendar
                    year={year}
                    month={month}
                    calendar={calendar}
                    isLoading={getLeaveListStatus === networkStatus.FETCH_IN_PROGRESS}
                    isError={getLeaveListStatus === networkStatus.FETCH_FAILED}
                    renderCalendarBox={renderCalendarBox}
                />
            </Stack>
        </Stack>
    )
}

export default LeaveForm