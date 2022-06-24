import "./calendar.css";
import React from "react";
import { months } from "../../constants/datetime";
import ErrorOverlay from "./ErrorOverlay";
import LoadingOverlay from "./LoadingOverlay";

function Calendar(props) {
    const { year, month, calendar, renderCalendarBox, isLoading, isError, onRetry } = props;

    return (
        <table className="calendar--calendar-container">
            <thead>
                <tr>
                    <th colSpan="7">
                        {year} {months[month]}
                    </th>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
                {calendar.map((week, i) => (
                    <tr key={i}>
                        {week.map((date, j) => (
                            <td key={j}>
                                {date && !isLoading && renderCalendarBox(date)}
                                <div>{date?.date}</div>
                            </td>
                        ))}
                    </tr>
                ))}
                <LoadingOverlay isVisible={isLoading} />
                <ErrorOverlay onRetry={onRetry} isVisible={isError} />
            </tbody>
        </table>
    );
}

Calendar.defaultProps = {
    calendar: [],
    isLoading: true,
    isError: false,
}

export default Calendar;