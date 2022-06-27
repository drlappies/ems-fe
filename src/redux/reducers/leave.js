import { networkStatus } from "../../constants/network"
import leaveActionTypes from "../actions/leave"

const initialState = {
    postLeaveStatus: networkStatus.IDLE,
    getLeaveStatus: networkStatus.IDLE,
    leaveList: [],
    leaveListCount: 0,
}

const leaveReducer = (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {
        case leaveActionTypes.POST_LEAVE:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case leaveActionTypes.POST_LEAVE_SUCCESS:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_SUCCEEDED
            }

        case leaveActionTypes.POST_LEAVE_FAILURE:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_FAILED
            }

        case leaveActionTypes.GET_LEAVE:
            return {
                ...state,
                getLeaveStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case leaveActionTypes.GET_LEAVE_SUCCESS:
            return {
                ...state,
                getLeaveStatus: networkStatus.FETCH_SUCCEEDED,
                leaveList: payload.leaveList,
                leaveListCount: payload.leaveListCount
            }

        case leaveActionTypes.GET_LEAVE_FAILURE:
            return {
                ...state,
                getLeaveStatus: networkStatus.FETCH_FAILED
            }

        default:
            return { ...state }
    }
}

export default leaveReducer