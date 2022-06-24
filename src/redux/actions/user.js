const userActionTypes = {
    POST_LOGIN: "POST_LOGIN",
    POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
    POST_LOGIN_FAILURE: "POST_LOGIN_FAILURE",

    GET_USER: "GET_USER",
    GET_USER_SUCCESS: "GET_USER_SUCCESS",
    GET_USER_FAILURE: "GET_USER_FAILURE",

    GET_USER_ATTENDANCE: "GET_USER_ATTENDANCE",
    GET_USER_ATTENDANCE_SUCCESS: "GET_USER_ATTENDANCE_SUCCESS",
    GET_USER_ATTENDANCE_FAILURE: "GET_USER_ATTENDANCE_FAILURE",

    GET_USER_LEAVE: "GET_USER_LEAVE",
    GET_USER_LEAVE_SUCCESS: "GET_USER_LEAVE_SUCCESS",
    GET_USER_LEAVE_FAILURE: "GET_USER_LEAVE_FAILURE",

    GET_USER_PAYROLL: "GET_USER_PAYROLL",
    GET_USER_PAYROLL_SUCCESS: "GET_USER_PAYROLL_SUCCESS",
    GET_USER_PAYROLL_FAILURE: "GET_USER_PAYROLL_FAILURE",
}

export default userActionTypes

export function postLogin(payload) {
    return {
        type: userActionTypes.POST_LOGIN,
        payload
    }
}

export function postLoginSuccess(payload) {
    return {
        type: userActionTypes.POST_LOGIN_SUCCESS,
        payload
    }
}

export function postLoginFailure(payload) {
    return {
        type: userActionTypes.POST_LOGIN_FAILURE,
        payload
    }
}

export function getUserAttendance(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE,
        payload
    }
}

export function getUserAttendanceSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE_SUCCESS,
        payload
    }
}

export function getUserAttendanceFailure(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE_FAILURE,
        payload
    }
}

export function getUserLeave(payload) {
    return {
        type: userActionTypes.GET_USER_LEAVE,
        payload
    }
}

export function getUserLeaveSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_LEAVE_SUCCESS,
        payload,
    }
}

export function getUserLeaveFailure(payload) {
    return {
        type: userActionTypes.GET_USER_OVERTIME_FAILURE,
        payload,
    }
}

export function getUserPayroll(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL,
        payload
    }
}

export function getUserPayrollSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL_SUCCESS,
        payload
    }
}

export function getUserPayrollFailure(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL_FAILURE,
        payload
    }
}

export function getUser(payload) {
    return {
        type: userActionTypes.GET_USER,
        payload
    }
}

export function getUserSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_SUCCESS,
        payload
    }
}

export function getUserFailure(payload) {
    return {
        type: userActionTypes.GET_USER_FAILURE,
        payload
    }
}
