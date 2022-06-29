import payrollActionTypes from "../actions/payroll";
import { networkStatus } from '../../constants/network';

const initialState = {
    getPayrollStatus: networkStatus.IDLE,
    payrollList: [],
    payrollListCount: 0,
}

const payrollReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case payrollActionTypes.GET_PAYROLL:
            return {
                ...state,
                getPayrollStatus: networkStatus.FETCH_IN_PROGRESS,
            }

        case payrollActionTypes.GET_PAYROLL_SUCCESS:
            return {
                ...state,
                getPayrollStatus: networkStatus.FETCH_SUCCEEDED,
                payrollList: payload.payrollList,
                payrollListCount: payload.payrollListCount,
            }

        case payrollActionTypes.GET_PAYROLL_FAILURE:
            return {
                ...state,
                getPayrollStatus: networkStatus.FETCH_FAILED,
            }

        default:
            return state;
    }
}

export default payrollReducer