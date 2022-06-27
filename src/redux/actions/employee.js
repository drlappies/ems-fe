const employeeActionTypes = {
    GET_EMPLOYEE: "GET_EMPLOYEE",
    GET_EMPLOYEE_SUCCESS: "GET_EMPLOYEE_SUCCESS",
    GET_EMPLOYEE_FAILURE: "GET_EMPLOYEE_FAILURE",

    GET_EMPLOYEE_TABLE: "GET_EMPLOYEE_TABLE",
    GET_EMPLOYEE_TABLE_SUCCESS: "GET_EMPLOYEE_TABLE_SUCCESS",
    GET_EMPLOYEE_TABLE_FAILURE: "GET_EMPLOYEE_TABLE_FAILURE",

    POST_EMPLOYEE: "POST_EMPLOYEE",
    POST_EMPLOYEE_SUCCESS: "POST_EMPLOYEE_SUCCESS",
    POST_EMPLOYEE_FAILURE: "POST_EMPLOYEE_FAILURE",

    PUT_EMPLOYEE_BY_ID: "PUT_EMPLOYEE_BY_ID",
    PUT_EMPLOYEE_BY_ID_SUCCESS: "PUT_EMPLOYEE_BY_ID_SUCCESS",
    PUT_EMPLOYEE_BY_ID_FAILURE: "PUT_EMPLOYEE_BY_ID_FAILURE",

    BATCH_UPDATE_EMPLOYEE: "BATCH_UPDATE_EMPLOYEE",
    BATCH_UPDATE_EMPLOYEE_SUCCESS: "BATCH_UPDATE_EMPLOYEE_SUCCESS",
    BATCH_UPDATE_EMPLOYEE_FAILURE: "BATCH_UPDATE_EMPLOYEE_FAILURE",

    DELETE_EMPLOYEE_BY_ID: "DELETE_EMPLOYEE_BY_ID",
    DELETE_EMPLOYEE_BY_ID_SUCCESS: "DELETE_EMPLOYEE_BY_ID_SUCCESS",
    DELETE_EMPLOYEE_BY_ID_FAILURE: "DELETE_EMPLOYEE_BY_ID_FAILURE",

    BATCH_DELETE_EMPLOYEE: "BATCH_DELETE_EMPLOYEE",
    BATCH_DELETE_EMPLOYEE_SUCCESS: "BATCH_DELETE_EMPLOYEE_SUCCESS",
    BATCH_DELETE_EMPLOYEE_FAILURE: "BATCH_DELETE_EMPLOYEE_FAILURE",
}

export default employeeActionTypes

export function getEmployee(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE,
        payload
    }
}

export function getEmployeeSuccess(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_SUCCESS,
        payload
    }
}

export function getEmployeeFailure(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_FAILURE,
        payload
    }
}

export function getEmployeeTable(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_TABLE,
        payload
    }
}

export function getEmployeeTableSuccess(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_TABLE_SUCCESS,
        payload
    }
}

export function getEmployeeTableFailure(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_TABLE_FAILURE,
        payload
    }
}

export function postEmployee(payload) {
    return {
        type: employeeActionTypes.POST_EMPLOYEE,
        payload
    }
}

export function postEmployeeSuccess(payload) {
    return {
        type: employeeActionTypes.POST_EMPLOYEE_SUCCESS,
        payload
    }
}

export function postEmployeeFailure(payload) {
    return {
        type: employeeActionTypes.POST_EMPLOYEE_FAILURE,
        payload
    }
}

export function putEmployeeById(payload) {
    return {
        type: employeeActionTypes.PUT_EMPLOYEE_BY_ID,
        payload
    }
}

export function putEmployeeByIdSuccess(payload) {
    return {
        type: employeeActionTypes.PUT_EMPLOYEE_BY_ID_SUCCESS,
        payload
    }
}

export function putEmployeeByIdFailure(payload) {
    return {
        type: employeeActionTypes.PUT_EMPLOYEE_BY_ID_FAILURE,
        payload
    }
}

export function batchUpdateEmployee(payload) {
    return {
        type: employeeActionTypes.BATCH_UPDATE_EMPLOYEE,
        payload
    }
}

export function batchUpdateEmployeeSuccess(payload) {
    return {
        type: employeeActionTypes.BATCH_UPDATE_EMPLOYEE_SUCCESS,
        payload
    }
}

export function batchUpdateEmployeeFailure(payload) {
    return {
        type: employeeActionTypes.BATCH_UPDATE_EMPLOYEE_FAILURE,
        payload
    }
}

export function deleteEmployeeById(payload) {
    return {
        type: employeeActionTypes.DELETE_EMPLOYEE_BY_ID,
        payload
    }
}

export function deleteEmployeeByIdSuccess(payload) {
    return {
        type: employeeActionTypes.DELETE_EMPLOYEE_BY_ID_SUCCESS,
        payload
    }
}

export function deleteEmployeeByIdFailure(payload) {
    return {
        type: employeeActionTypes.DELETE_EMPLOYEE_BY_ID_FAILURE,
        payload
    }
}

export function batchDeleteEmployee(payload) {
    return {
        type: employeeActionTypes.BATCH_DELETE_EMPLOYEE,
        payload
    }
}

export function batchDeleteEmployeeSuccess(payload) {
    return {
        type: employeeActionTypes.BATCH_DELETE_EMPLOYEE_SUCCESS,
        payload
    }
}

export function batchDeleteEmployeeFailure(payload) {
    return {
        type: employeeActionTypes.BATCH_DELETE_EMPLOYEE_FAILURE,
        payload
    }
}