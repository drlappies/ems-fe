import { useState } from 'react';
import moment from 'moment'

const useCalendar = (initialMonth = moment().month(), initialYear = moment().year()) => {
    const [state, setState] = useState({
        month: initialMonth,
        year: initialYear,
    });

    const next = () => {
        setState((prevState) => {
            return {
                ...prevState,
                month:
                    prevState.month + 1 > 11 ? 0 : prevState.month + 1,
                year:
                    prevState.month + 1 > 11
                        ? prevState.year + 1
                        : prevState.year,
            };
        });
    }

    const prev = () => {
        setState((prevState) => {
            return {
                ...prevState,
                month:
                    prevState.month - 1 <= 0 ? 11 : prevState.month - 1,
                year:
                    prevState.month - 1 <= 0
                        ? prevState.year - 1
                        : prevState.year,
            };
        });
    }

    const select = (month, year) => {
        if (month < 0 || month > 11) month = 0
        if (isNaN(year) || year < 100) year = moment().year()

        setState((prevState) => {
            return {
                ...prevState,
                month: parseInt(month),
                year: parseInt(year)
            };
        });
    }

    const reset = () => {
        setState((prevState) => {
            return {
                ...prevState,
                month: moment().month(),
                year: moment().year()
            };
        });
    }

    const create = (month, year) => {
        const startOfMonth = moment().month(month).year(year).startOf('month')
        const endOfMonth = moment().month(month).year(year).endOf('month')
        const calendar = [];

        for (let i = 0; i < 6; i++) {
            const week = []
            for (let j = 0; j < 7; j++) {
                if (j !== startOfMonth.day() || startOfMonth > endOfMonth) {
                    week.push(null)
                } else {
                    week.push({
                        date: startOfMonth.date()
                    })
                    startOfMonth.add(1, 'days')
                }
            }
            calendar.push(week)
        }

        return calendar
    }

    return [state.month, state.year, next, prev, select, create, reset];
}

export default useCalendar