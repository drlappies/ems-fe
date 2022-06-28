import moment from 'moment'
import fetch from "../../services/axios/index";
import leaveApi from '../../services/apis/leave';
import * as leaveAction from '../actions/leave'

export function postLeave(employeeId, leaveType, span, date, status, remark, cb) {
    return async (dispatch) => {
        dispatch(leaveAction.postLeave())
        try {
            const data = {
                employee_id: employeeId,
                leave_type: leaveType,
                span: span,
                date: date,
                status: status,
                remark: remark
            }

            const res = await fetch(leaveApi.postLeave.api, leaveApi.postLeave.method, data)

            dispatch(leaveAction.postLeaveSuccess())

            if (cb) cb(res.data)
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

export function putLeaveById(id, data, cb) {
    return async (dispatch) => {
        dispatch(leaveAction.putLeaveById())
        try {
            const res = await fetch(leaveApi.putLeaveById.api.replace("{{id}}", id), leaveApi.putLeaveById.method, data)

            const payload = {
                updatedLeaveList: res.data.result
            }

            dispatch(leaveAction.putLeaveByIdSuccess(payload))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(leaveAction.putLeaveByIdFailure())
        }
    }
}

export function batchUpdateLeave(ids, data, cb) {
    return async (dispatch) => {
        dispatch(leaveAction.postBatchUpdateLeave())
        try {
            const res = await fetch(leaveApi.batchUpdateLeave.api, leaveApi.batchUpdateLeave.method, {
                ids: ids,
                data: data
            })
            dispatch(leaveAction.postBatchUpdateLeaveSuccess())

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(leaveAction.postBatchUpdateLeaveFailure())
        }
    }
}

export function deleteLeaveById(id, cb) {
    return async (dispatch) => {
        dispatch(leaveAction.deleteLeaveById())
        try {
            const res = await fetch(leaveApi.deleteLeaveById.api.replace("{{id}}", id), leaveApi.deleteLeaveById.method)

            const payload = {
                leave: res.data.result
            }

            dispatch(leaveAction.deleteLeaveByIdSuccess(payload))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(leaveAction.deleteLeaveByIdFailure())
        }
    }
}

export function batchDeleteLeave(ids, cb) {
    return async (dispatch) => {
        dispatch(leaveAction.postBatchDeleteLeave())
        try {
            const res = await fetch(leaveApi.batchDeleteLeave.api, leaveApi.batchDeleteLeave.method, {
                ids: ids
            })
            dispatch(leaveAction.postBatchDeleteLeaveSuccess())

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(leaveAction.postBatchDeleteLeaveFailure())
        }
    }
}