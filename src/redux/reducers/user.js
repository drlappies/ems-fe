import { networkStatus } from "../../constants/network"
import userActionTypes from "../actions/user"

const initialState = {
    user: null,
    postLoginStatus: networkStatus.IDLE,
    getUserStatus: networkStatus.IDLE,
    getAttdListStatus: networkStatus.IDLE,
    getLeaveListStatus: networkStatus.IDLE,
    getUserPayrollStatus: networkStatus.IDLE,
    attdList: [],
    leaveList: [],
    userPayroll: [],
    payrollCount: 0,
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case userActionTypes.POST_LOGIN:
            return {
                ...state,
                postLoginStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.POST_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                postLoginStatus: networkStatus.FETCH_SUCCEEDED
            }

        case userActionTypes.POST_LOGIN_FAILURE:
            return {
                ...state,
                postLoginStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_SUCCEEDED,
                user: payload.user
            }

        case userActionTypes.GET_USER_FAILURE:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_ATTENDANCE:
            return {
                ...state,
                getAttdListStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_ATTENDANCE_SUCCESS:
            return {
                ...state,
                getAttdListStatus: networkStatus.FETCH_SUCCEEDED,
                attdList: payload.attdList
            }

        case userActionTypes.GET_USER_ATTENDANCE_FAILURE:
            return {
                ...state,
                getAttdListStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER_LEAVE:
            return {
                ...state,
                getLeaveListStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_LEAVE_SUCCESS:
            return {
                ...state,
                getLeaveListStatus: networkStatus.FETCH_SUCCEEDED,
                userLeave: payload.userLeave
            }

        case userActionTypes.GET_USER_LEAVE_FAILURE:
            return {
                ...state,
                getLeaveListStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_PAYROLL:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_PAYROLL_SUCCESS:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_SUCCEEDED,
                userPayroll: payload.userPayroll,
                payrollCount: payload.payrollCount
            }

        case userActionTypes.GET_USER_PAYROLL_FAILURE:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_FAILED,
            }

        default:
            return { ...state }
    }
}

export default userReducer