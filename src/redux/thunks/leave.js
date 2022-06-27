import moment from 'moment'
import fetch from "../../services/axios/index";
import leaveApi from '../../services/apis/leave';
import * as leaveAction from '../actions/leave'

export function postLeave() {
    return async (dispatch) => {
        dispatch(leaveAction.postLeave())
        try {



            dispatch(leaveAction.postLeaveSuccess())
        } catch (error) {
            dispatch(leaveAction.postLeaveFailure())
        }
    }
}

export function postApply(date, span, type, status) {
    return async (dispatch) => {
        dispatch(leaveAction.postApplyLeave())
        try {
            const data = {
                date: date,
                span: span,
                leave_type: type,
                status: status,
            }

            await fetch(leaveApi.postApply.api, leaveApi.postApply.method, data)
            dispatch(leaveAction.postApplyLeaveSuccess())
        } catch (error) {
            dispatch(leaveAction.postApplyLeaveFailure())
        }
    }
}

export function postApplyMany(leaves) {
    return async (dispatch) => {
        dispatch(leaveAction.postApplyManyLeave())
        try {
            const data = {
                leaves: leaves.map(el => {
                    return {
                        ...el,
                        date: el.date.format('YYYY-MM-DD'),
                    }
                })
            }

            await fetch(leaveApi.postApplyMany.api, leaveApi.postApplyMany.method, data)
            dispatch(leaveAction.postApplyManyLeaveSuccess())
        }
        catch (error) {
            dispatch(leaveAction.postApplyManyLeaveFailure())
        }
    }
}

export function getLeave(offset, limit, orderBy, order, search, employeeId, status, type, span, minDate, maxDate) {
    return async (dispatch) => {
        dispatch(leaveAction.getLeave())
        try {
            if (employeeId === "any") employeeId = ""
            if (status === "any") status = ""
            if (type === "any") type = ""
            if (span === "any") span = ""

            const params = {
                offset: offset,
                limit: limit,
                orderBy: orderBy,
                order: order,
                search: search,
                employee_id: employeeId,
                status: status,
                mindate: minDate,
                maxdate: maxDate,
                leave_type: type,
                span: span
            }

            const res = await fetch(leaveApi.getLeave.api, leaveApi.getLeave.method, params)

            const payload = {
                leaveList: res.data.result.map(el => {
                    return {
                        ...el,
                        date: moment(el.date).format('YYYY-MM-DD')
                    }
                }),
                leaveListCount: parseInt(res.data.count.count),
            }

            dispatch(leaveAction.getLeaveSuccess(payload))
        } catch (error) {
            dispatch(leaveAction.getLeaveFailure())
        }
    }
}