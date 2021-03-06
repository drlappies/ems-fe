import fetch from '../../services/axios/index'
import userApi from '../../services/apis/user'
import loginApi from '../../services/apis/login'
import * as userAction from '../actions/user'
import { replace } from 'connected-react-router'
import moment from 'moment'

export function postLogin(username, password) {
    return async (dispatch) => {
        dispatch(userAction.postLogin())
        try {
            const data = {
                username: username,
                password: password
            }

            const res = await fetch(loginApi.postLogin.api, loginApi.postLogin.method, data)

            window.localStorage.setItem("token", res.data.token)

            const payload = {
                user: res.data.userObj
            }

            dispatch(userAction.postLoginSuccess(payload))

            dispatch(replace('/dashboard'))
        } catch (error) {
            dispatch(userAction.postLoginFailure(error))
        }
    }
}

export function getUser() {
    return async (dispatch) => {
        dispatch(userAction.getUser())
        try {
            const res = await fetch(userApi.getUser.api, userApi.getUser.method)

            const payload = {
                user: res.data
            }

            dispatch(userAction.getUserSuccess(payload))
            dispatch(replace('/dashboard'))
        } catch (error) {
            dispatch(userAction.getUserFailure())
            dispatch(replace('/'))
        }
    }
}

export function getUserAttendance(mindate, maxdate) {
    return async (dispatch) => {
        dispatch(userAction.getUserAttendance())
        try {

            const params = {
                mindate: mindate,
                maxdate: maxdate
            }

            const res = await fetch(userApi.getUserAttendance.api, userApi.getUserAttendance.method, params)

            const payload = {
                attdList: res.data.result
            }

            dispatch(userAction.getUserAttendanceSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserAttendanceFailure(error))
        }
    }
}

export function getUserLeave(mindate, maxdate) {
    return async (dispatch) => {
        dispatch(userAction.getUserLeave())
        try {
            const params = {
                mindate: mindate,
                maxdate: maxdate
            }

            const res = await fetch(userApi.getUserLeave.api, userApi.getUserLeave.method, params)

            const payload = {
                leaveList: res.data.result
            }

            dispatch(userAction.getUserLeaveSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserLeaveFailure(error))
        }
    }
}

export function getUserPayroll(offset, limit, order, sort) {
    return async (dispatch) => {
        dispatch(userAction.getUserPayroll())
        try {
            const params = {
                offset: offset,
                limit: limit,
                sort: sort,
                order: order,
            }

            const res = await fetch(userApi.getUserPayroll.api, userApi.getUserPayroll.method, params)

            const payload = {
                payrollList: res.data.result.result.map(row => {
                    return {
                        ...row,
                        date_from: moment(row.date_from).format('YYYY-MM-DD'),
                        date_to: moment(row.date_to).format('YYYY-MM-DD'),
                        payday: moment(row.payday).format('YYYY-MM-DD'),
                        amount: `$${row.amount}`
                    }
                }),
                payrollListCount: parseInt(res.data.result.count.count)
            }

            dispatch(userAction.getUserPayrollSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserPayrollFailure(error))
        }
    }
}


