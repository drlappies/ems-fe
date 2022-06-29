import moment from 'moment'
import fetch from '../../services/axios/index'
import payrollApi from '../../services/apis/payroll'
import * as payrollAction from '../actions/payroll'

export function getPayroll(offset, limit, orderBy, order, search, employeeId, mindate, maxdate, status, cb) {
    return async (dispatch) => {
        if (employeeId === "any") employeeId = ""
        if (status === "any") status = ""

        dispatch(payrollAction.getPayroll())
        try {
            const params = {
                offset: offset,
                limit: limit,
                orderBy: orderBy,
                order: order,
                search: search,
                mindate: mindate,
                maxdate: maxdate,
                status: status,
                employee_id: employeeId,
            }

            const res = await fetch(payrollApi.getPayroll.api, payrollApi.getPayroll.method, params)

            const payload = {
                payrollList: res.data.result.map(el => {
                    return {
                        ...el,
                        payday: moment(el.date).format("YYYY-MM-DD"),
                        date_to: moment(el.date_to).format("YYYY-MM-DD"),
                        date_from: moment(el.date_from).format("YYYY-MM-DD"),
                    }
                }),
                payrollListCount: parseInt(res.data.count.count)
            }

            dispatch(payrollAction.getPayrollSuccess(payload))

            if (cb) cb(res.data)
        } catch (error) {
            console.log(error)

            dispatch(payrollAction.getPayrollFailure())
        }
    }
}

export function postPayroll(employeeId, dateFrom, dateTo, date, cb) {
    return async (dispatch) => {
        dispatch(payrollAction.postPayroll())
        try {
            const data = {
                employee_id: employeeId,
                date_from: dateFrom,
                date_to: dateTo,
                payday: date,
            }

            const res = await fetch(payrollApi.postPayroll.api, payrollApi.postPayroll.method, data)

            dispatch(payrollAction.postPayrollSuccess(res.data))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(payrollAction.postPayrollFailure())
        }
    }
}

export function putPayroll(id, status, cb) {
    return async (dispatch) => {
        dispatch(payrollAction.putPayrollById())
        try {
            const data = {
                status: status,
            }

            const res = await fetch(payrollApi.putPayrollById.api.replace("{{id}}", id), payrollApi.putPayrollById.method, data)

            dispatch(payrollAction.putPayrollByIdSuccess(res.data))

            if (cb) cb(res.data)
        } catch (error) {
            console.log(error)
            dispatch(payrollAction.putPayrollByIdFailure())
        }
    }
}

export function batchUpdatePayroll(ids, status, cb) {
    return async (dispatch) => {
        dispatch(payrollAction.batchUpdatePayroll())
        try {
            const data = {
                ids: [...ids],
                status: status,
            }

            const res = await fetch(payrollApi.batchUpdatePayroll.api, payrollApi.batchUpdatePayroll.method, data)

            dispatch(payrollAction.batchUpdatePayrollSuccess(res.data))

            if (cb) cb(res.data)
        } catch (error) {
            console.log(error)
            dispatch(payrollAction.batchUpdatePayrollFailure())
        }
    }
}

export function deletePayrollById(id, cb) {
    return async (dispatch) => {
        dispatch(payrollAction.deletePayrollById())
        try {
            const res = await fetch(payrollApi.deletePayrollById.api.replace("{{id}}", id), payrollApi.deletePayrollById.method)

            dispatch(payrollAction.deletePayrollByIdSuccess(res.data))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(payrollAction.deletePayrollByIdFailure())
        }
    }
}

export function batchDeletePayroll(ids, cb) {
    return async (dispatch) => {
        dispatch(payrollAction.batchDeletePayroll())
        try {
            const data = {
                ids: [...ids],
            }

            const res = await fetch(payrollApi.batchDeletePayroll.api, payrollApi.batchDeletePayroll.method, data)

            dispatch(payrollAction.batchDeletePayrollSuccess(res.data))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(payrollAction.batchDeletePayrollFailure())
        }
    }
}