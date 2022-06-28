const leaveActionTypes = {
    POST_LEAVE: "POST_LEAVE",
    POST_LEAVE_SUCCESS: "POST_LEAVE_SUCCESS",
    POST_LEAVE_FAILURE: "POST_LEAVE_FAILURE",

    POST_APPLY_LEAVE: "POST_APPLY_LEAVE",
    POST_APPLY_LEAVE_SUCCESS: "POST_APPLY_LEAVE_SUCCESS",
    POST_APPLY_LEAVE_FAILURE: "POST_APPLY_LEAVE_FAILURE",

    POST_APPLY_MANY_LEAVE: "POST_APPLY_MANY_LEAVE",
    POST_APPLY_MANY_LEAVE_SUCCESS: "POST_APPLY_MANY_LEAVE_SUCCESS",
    POST_APPLY_MANY_LEAVE_FAILURE: "POST_APPLY_MANY_LEAVE_FAILURE",

    GET_LEAVE: "GET_LEAVE",
    GET_LEAVE_SUCCESS: "GET_LEAVE_SUCCESS",
    GET_LEAVE_FAILURE: "GET_LEAVE_FAILURE",

    PUT_LEAVE_BY_ID: "PUT_LEAVE_BY_ID",
    PUT_LEAVE_BY_ID_SUCCESS: "PUT_LEAVE_BY_ID_SUCCESS",
    PUT_LEAVE_BY_ID_FAILURE: "PUT_LEAVE_BY_ID_FAILURE",

    POST_BATCH_UPDATE_LEAVE: "POST_BATCH_UPDATE_LEAVE",
    POST_BATCH_UPDATE_LEAVE_SUCCESS: "POST_BATCH_UPDATE_LEAVE_SUCCESS",
    POST_BATCH_UPDATE_LEAVE_FAILURE: "POST_BATCH_UPDATE_LEAVE_FAILURE",

    DELETE_LEAVE_BY_ID: "DELETE_LEAVE_BY_ID",
    DELETE_LEAVE_BY_ID_SUCCESS: "DELETE_LEAVE_BY_ID_SUCCESS",
    DELETE_LEAVE_BY_ID_FAILURE: "DELETE_LEAVE_BY_ID_FAILURE",

    POST_BATCH_DELETE_LEAVE: "POST_BATCH_DELETE_LEAVE",
    POST_BATCH_DELETE_LEAVE_SUCCESS: "POST_BATCH_DELETE_LEAVE_SUCCESS",
    POST_BATCH_DELETE_LEAVE_FAILURE: "POST_BATCH_DELETE_LEAVE_FAILURE",
}

export default leaveActionTypes

export function postLeave(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE,
        payload
    }
}

export function postLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE_SUCCESS,
        payload
    }
}

export function postLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE_FAILURE,
        payload
    }
}

export function postApplyLeave(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE,
        payload
    }
}

export function postApplyLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE_SUCCESS,
        payload
    }
}

export function postApplyLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE_FAILURE,
        payload
    }
}

export function postApplyManyLeave(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_MANY_LEAVE,
        payload
    }
}

export function postApplyManyLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_MANY_LEAVE_SUCCESS,
        payload
    }
}

export function postApplyManyLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_MANY_LEAVE_FAILURE,
        payload
    }
}

export function getLeave(payload) {
    return {
        type: leaveActionTypes.GET_LEAVE,
        payload
    }
}

export function getLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.GET_LEAVE_SUCCESS,
        payload
    }
}

export function getLeaveFailure(payload) {
    return {
        type: leaveActionTypes.GET_LEAVE_FAILURE,
        payload
    }
}

export function putLeaveById(payload) {
    return {
        type: leaveActionTypes.PUT_LEAVE_BY_ID,
        payload
    }
}

export function putLeaveByIdSuccess(payload) {
    return {
        type: leaveActionTypes.PUT_LEAVE_BY_ID_SUCCESS,
        payload
    }
}

export function putLeaveByIdFailure(payload) {
    return {
        type: leaveActionTypes.PUT_LEAVE_BY_ID_FAILURE,
        payload
    }
}

export function postBatchUpdateLeave(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_UPDATE_LEAVE,
        payload
    }
}

export function postBatchUpdateLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_UPDATE_LEAVE_SUCCESS,
        payload
    }
}

export function postBatchUpdateLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_UPDATE_LEAVE_FAILURE,
        payload
    }
}

export function deleteLeaveById(payload) {
    return {
        type: leaveActionTypes.DELETE_LEAVE_BY_ID,
        payload
    }
}

export function deleteLeaveByIdSuccess(payload) {
    return {
        type: leaveActionTypes.DELETE_LEAVE_BY_ID_SUCCESS,
        payload
    }
}

export function deleteLeaveByIdFailure(payload) {
    return {
        type: leaveActionTypes.DELETE_LEAVE_BY_ID_FAILURE,
        payload
    }
}

export function postBatchDeleteLeave(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_DELETE_LEAVE,
        payload
    }
}

export function postBatchDeleteLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_DELETE_LEAVE_SUCCESS,
        payload
    }
}

export function postBatchDeleteLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_BATCH_DELETE_LEAVE_FAILURE,
        payload
    }
}