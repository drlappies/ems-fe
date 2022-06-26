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

export function postApply(from, to, reason, type, duration) {
    return async (dispatch) => {
        dispatch(leaveAction.postApplyLeave())
        try {
            const data = {
                from: from,
                to: to,
                reason: reason,
                duration: duration,
                type: type
            }

            await fetch(leaveApi.postApply.api, leaveApi.postApply.method, { body: data })
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