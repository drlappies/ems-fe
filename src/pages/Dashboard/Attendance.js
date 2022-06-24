import { React, useMemo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAttendance } from '../../redux/thunks/user'
import { networkStatus } from '../../constants/network'
import { getDatesByYearAndMonth } from '../../utils/datetime'
import MonthlyCalendar from "../../components/Calendar/MonthlyCalendar"
import CalendarTimePicker from '../../components/Calendar/CalendarTimePicker'
import useCalendar from '../../components/Calendar/useCalendar'

const renderCalendarBox = ({ check_in_time, check_out_time, status }) => {
    if (!check_in_time && !check_out_time) return;

    return (
        <div>
            <div>
                <span>check-in </span>
                <span>{check_in_time}</span>
            </div>
            <div>
                <span>check-out </span>
                <span>{check_out_time}</span>
            </div>
            <div>
                <span style={{ backgroundColor: status === "on_time" ? "lightgreen" : "red" }}>{status}</span>
            </div>
        </div>
    )
}

function DashboardAttendanceTab() {
    const dispatch = useDispatch();
    const getAttdListStatus = useSelector((state) => state.user.getAttdListStatus);
    const attdList = useSelector((state) => state.user.attdList);
    const [month, year, next, prev, select, create, reset] = useCalendar()

    const calendar = useMemo(() => {
        const rawCalendar = create(month, year)

        for (let i = 0; i < rawCalendar.length; i++) {
            for (let j = 0; j < rawCalendar[i].length; j++) {
                const date = rawCalendar[i][j];
                if (date) {
                    console.log(attdList)
                    const attd = attdList.find((el) => new Date(el.date).getDate() === date.date)
                    if (attd) {
                        rawCalendar[i][j] = {
                            ...date,
                            status: attd.status,
                            check_in_time: attd.check_in_time,
                            check_out_time: attd.check_out_time,
                        }
                    }
                }
            }
        }

        return rawCalendar
    }, [attdList, create, month, year])

    const handleRetry = useCallback(() => {
        const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
        dispatch(getUserAttendance(mindate, maxdate));
    }, [dispatch, month, year])

    useEffect(() => {
        const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
        dispatch(getUserAttendance(mindate, maxdate));
    }, [dispatch, month, year])

    return (
        <>
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
                isLoading={getAttdListStatus === networkStatus.FETCH_IN_PROGRESS}
                isError={getAttdListStatus === networkStatus.FETCH_FAILED}
                onRetry={handleRetry}
                calendar={calendar}
                renderCalendarBox={renderCalendarBox}
            />
        </>
    )
}

export default DashboardAttendanceTab