import { React, useMemo, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLeave } from '../../redux/thunks/user'
import { networkStatus } from '../../constants/network'
import { getDatesByYearAndMonth } from '../../utils/datetime'
import MonthlyCalendar from "../../components/Calendar/MonthlyCalendar"
import CalendarTimePicker from '../../components/Calendar/CalendarTimePicker'
import useCalendar from '../../components/Calendar/useCalendar'


const renderCalendarBox = ({ leave_type, status, span }) => {
    if (!status && !leave_type && span) return;

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return '#00b300';
            case 'pending':
                return '#ffc000';
            case 'rejected':
                return '#ff0000';
            default:
                return '#ffffff';
        }
    }

    const getLeaveTypeColor = (leave_type) => {
        switch (leave_type) {
            case 'personal':
                return '#ffb6c1';
            case 'sick':
                return '#9acd32';
            default:
                return '#ffffff';
        }
    }

    const getSpanColor = (span) => {
        switch (span) {
            case 'full_day':
                return '#00b300';
            case 'half_day':
                return '#ffc000';
            default:
                return '#ffffff';
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: getSpanColor(span) }}>{span}</div>
            <div style={{ backgroundColor: getLeaveTypeColor(leave_type) }}>{leave_type}</div>
            <div style={{ backgroundColor: getStatusColor(status) }}>{status}</div>
        </div>
    );
}

function DashboardLeaveTab() {
    const dispatch = useDispatch();
    const getLeaveListStatus = useSelector((state) => state.user.getLeaveListStatus);
    const leaveList = useSelector((state) => state.user.leaveList);
    const [month, year, next, prev, select, create, reset] = useCalendar()

    const calendar = useMemo(() => {
        const rawCalendar = create(month, year)

        for (let i = 0; i < rawCalendar.length; i++) {
            for (let j = 0; j < rawCalendar[i].length; j++) {
                const date = rawCalendar[i][j];
                if (date) {
                    const leave = leaveList.find((el) => new Date(el.date).getDate() === date.date)
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
    }, [create, leaveList, month, year])

    const handleRetry = useCallback(() => {
        const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
        dispatch(getUserLeave(mindate, maxdate));
    }, [dispatch, month, year])

    useEffect(() => {
        const { mindate, maxdate } = getDatesByYearAndMonth(year, month)
        dispatch(getUserLeave(mindate, maxdate));
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
                isLoading={getLeaveListStatus === networkStatus.FETCH_IN_PROGRESS}
                isError={getLeaveListStatus === networkStatus.FETCH_FAILED}
                onRetry={handleRetry}
                calendar={calendar}
                renderCalendarBox={renderCalendarBox}
            />
        </>
    )
}

export default DashboardLeaveTab