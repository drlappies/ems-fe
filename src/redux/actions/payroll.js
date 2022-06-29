const payrollActionTypes = {
    GET_PAYROLL: 'GET_PAYROLL',
    GET_PAYROLL_SUCCESS: 'GET_PAYROLL_SUCCESS',
    GET_PAYROLL_FAILURE: 'GET_PAYROLL_FAILURE',

    POST_PAYROLL: 'POST_PAYROLL',
    POST_PAYROLL_SUCCESS: 'POST_PAYROLL_SUCCESS',
    POST_PAYROLL_FAILURE: 'POST_PAYROLL_FAILURE',

    PUT_PAYROLL_BY_ID: "PUT_PAYROLL_BY_ID",
    PUT_PAYROLL_BY_ID_SUCCESS: "PUT_PAYROLL_BY_ID_SUCCESS",
    PUT_PAYROLL_BY_ID_FAILURE: "PUT_PAYROLL_BY_ID_FAILURE",

    BATCH_UPDATE_PAYROLL: "BATCH_UPDATE_PAYROLL",
    BATCH_UPDATE_PAYROLL_SUCCESS: "BATCH_UPDATE_PAYROLL_SUCCESS",
    BATCH_UPDATE_PAYROLL_FAILURE: "BATCH_UPDATE_PAYROLL_FAILURE",

    DELETE_PAYROLL_BY_ID: "DELETE_PAYROLL_BY_ID",
    DELETE_PAYROLL_BY_ID_SUCCESS: "DELETE_PAYROLL_BY_ID_SUCCESS",
    DELETE_PAYROLL_BY_ID_FAILURE: "DELETE_PAYROLL_BY_ID_FAILURE",

    BATCH_DELETE_PAYROLL: "BATCH_DELETE_PAYROLL",
    BATCH_DELETE_PAYROLL_SUCCESS: "BATCH_DELETE_PAYROLL_SUCCESS",
    BATCH_DELETE_PAYROLL_FAILURE: "BATCH_DELETE_PAYROLL_FAILURE",
}

export default payrollActionTypes;

export function getPayroll(payload) {
    return {
        type: payrollActionTypes.GET_PAYROLL,
        payload
    }
}

export function getPayrollSuccess(payload) {
    return {
        type: payrollActionTypes.GET_PAYROLL_SUCCESS,
        payload
    }
}

export function getPayrollFailure(payload) {
    return {
        type: payrollActionTypes.GET_PAYROLL_FAILURE,
        payload
    }
}

export function postPayroll(payload) {
    return {
        type: payrollActionTypes.POST_PAYROLL,
        payload
    }
}

export function postPayrollSuccess(payload) {
    return {
        type: payrollActionTypes.POST_PAYROLL_SUCCESS,
        payload
    }
}

export function postPayrollFailure(payload) {
    return {
        type: payrollActionTypes.POST_PAYROLL_FAILURE,
        payload
    }
}

export function putPayrollById(payload) {
    return {
        type: payrollActionTypes.PUT_PAYROLL_BY_ID,
        payload
    }
}

export function putPayrollByIdSuccess(payload) {
    return {
        type: payrollActionTypes.PUT_PAYROLL_BY_ID_SUCCESS,
        payload
    }
}

export function putPayrollByIdFailure(payload) {
    return {
        type: payrollActionTypes.PUT_PAYROLL_BY_ID_FAILURE,
        payload
    }
}

export function deletePayrollById(payload) {
    return {
        type: payrollActionTypes.DELETE_PAYROLL_BY_ID,
        payload
    }
}

export function deletePayrollByIdSuccess(payload) {
    return {
        type: payrollActionTypes.DELETE_PAYROLL_BY_ID_SUCCESS,
        payload
    }
}

export function deletePayrollByIdFailure(payload) {
    return {
        type: payrollActionTypes.DELETE_PAYROLL_BY_ID_FAILURE,
        payload
    }
}

export function batchUpdatePayroll(payload) {
    return {
        type: payrollActionTypes.BATCH_UPDATE_PAYROLL,
        payload
    }
}

export function batchUpdatePayrollSuccess(payload) {
    return {
        type: payrollActionTypes.BATCH_UPDATE_PAYROLL_SUCCESS,
        payload
    }
}

export function batchUpdatePayrollFailure(payload) {
    return {
        type: payrollActionTypes.BATCH_UPDATE_PAYROLL_FAILURE,
        payload
    }
}

export function batchDeletePayroll(payload) {
    return {
        type: payrollActionTypes.BATCH_DELETE_PAYROLL,
        payload
    }
}

export function batchDeletePayrollSuccess(payload) {
    return {
        type: payrollActionTypes.BATCH_DELETE_PAYROLL_SUCCESS,
        payload
    }
}

export function batchDeletePayrollFailure(payload) {
    return {
        type: payrollActionTypes.BATCH_DELETE_PAYROLL_FAILURE,
        payload
    }
}