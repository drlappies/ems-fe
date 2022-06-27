import { networkStatus } from "../../constants/network";
import employeeActionTypes from "../actions/employee"

const initialState = {
    getEmployeeStatus: networkStatus.IDLE,
    getEmployeeTableStatus: networkStatus.IDLE,
    employeeList: [],
    employeeTable: [],
    employeeTableCount: 0,
}

const employeeReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case employeeActionTypes.GET_EMPLOYEE:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case employeeActionTypes.GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_SUCCEEDED,
                employeeList: payload.employeeList
            }

        case employeeActionTypes.GET_EMPLOYEE_FAILURE:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_FAILED
            }

        case employeeActionTypes.GET_EMPLOYEE_TABLE:
            return {
                ...state,
                getEmployeeTableStatus: networkStatus.FETCH_IN_PROGRESS,
            }

        case employeeActionTypes.GET_EMPLOYEE_TABLE_SUCCESS:
            return {
                ...state,
                getEmployeeTableStatus: networkStatus.FETCH_SUCCEEDED,
                employeeTable: payload.employeeTable,
                employeeTableCount: payload.employeeTableCount
            }

        case employeeActionTypes.GET_EMPLOYEE_TABLE_FAILURE:
            return {
                ...state,
                getEmployeeTableStatus: networkStatus.FETCH_FAILED,
            }

        default:
            return state
    }
}

export default employeeReducer