import moment from 'moment';
import fetch from "../../services/axios/index";
import attendanceApi from "../../services/apis/attendance";
import * as attendanceAction from '../actions/attendance';
// import * as snackbarAction from '../actions/notification';

export function getUserCheckInStatus() {
    return async (dispatch) => {
        dispatch(attendanceAction.getUserCheckInStatus())
        try {
            const res = await fetch(attendanceApi.getUserCheckInStatus.api, attendanceApi.getUserCheckInStatus.method)

            const payload = {
                hasUserCheckedIn: res.data.check_in_time ? true : false,
                hasUserCheckedOut: res.data.check_out_time ? true : false,
                userCheckInTime: res.data.check_in_time,
                userCheckOutTime: res.data.check_out_time
            }

            dispatch(attendanceAction.getUserCheckInStatusSuccess(payload))
        } catch (error) {
            console.log(error)
            dispatch(attendanceAction.getUserCheckInStatusFailure(error))
        }
    }
}

export function postAttdCheckIn() {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendanceCheckIn())
        try {
            const res = await fetch(attendanceApi.postCheckIn.api, attendanceApi.postCheckIn.method)

            const payload = {
                userCheckInTime: res.data.check_in_time,
                hasUserCheckedIn: true,
            }

            dispatch(attendanceAction.postAttendanceCheckInSuccess(payload))


        } catch (error) {
            dispatch(attendanceAction.postAttendanceCheckInFailure(error))
        }
    }
}

export function postAttdCheckOut() {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendanceCheckOut())
        try {
            const res = await fetch(attendanceApi.postCheckOut.api, attendanceApi.postCheckOut.method)

            const payload = {
                userCheckOutTime: res.data.check_out_time,
                hasUserCheckedOut: true,
            }

            dispatch(attendanceAction.postAttendanceCheckOutSuccess(payload))

            // const snackbar = {
            //     message: "Successfully checked out",
            //     options: {
            //         variant: 'success',
            //     }
            // }

            // dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.postAttendanceCheckOutFailure(error))
        }
    }
}

export function getAttendance(offset, limit, orderBy, order, search, employeeId, status, minDate, maxDate,) {
    return async (dispatch) => {
        dispatch(attendanceAction.getAttendance())
        try {
            if (employeeId === "any") employeeId = ""
            if (status === "any") status = ""

            const res = await fetch(attendanceApi.getAttendance.api, attendanceApi.getAttendance.method, {
                offset: offset,
                limit: limit,
                employee_id: employeeId,
                status: status,
                search: search,
                mindate: minDate,
                maxdate: maxDate,
                orderBy: orderBy,
                order: order,
            })

            const payload = {
                attdList: res.data.result.map(el => {
                    return {
                        ...el,
                        date: moment(el.date).format("YYYY-MM-DD")
                    }
                }),
                attdListCount: parseInt(res.data.count.count)
            }

            dispatch(attendanceAction.getAttendanceSuccess(payload))
        } catch (error) {
            dispatch(attendanceAction.getAttendanceFailure(error))
        }
    }
}

export function postAttendance(employeeId, date, checkInTime, checkOutTime, status, cb) {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendance())
        try {
            const res = await fetch(attendanceApi.postAttendance.api, attendanceApi.postAttendance.method, {
                employee_id: employeeId,
                date: date,
                check_in_time: checkInTime,
                check_out_time: checkOutTime,
                status: status
            })

            dispatch(attendanceAction.postAttendanceSuccess())

            if (cb) {
                cb(res.data)
            }
        } catch (error) {
            dispatch(attendanceAction.postAttendanceFailure())
        }
    }
}

export function getAttendanceById(id) {
    return async (dispatch) => {
        dispatch(attendanceAction.getAttendanceById())
        try {
            const res = await fetch(attendanceApi.getAttendanceById.api.replace("{{id}}", id), attendanceApi.getAttendanceById.method)

            const payload = {
                attendance: res.data
            }

            dispatch(attendanceAction.getAttendanceByIdSuccess(payload))
        } catch (error) {
            dispatch(attendanceAction.getAttendanceByIdFailure())
        }
    }
}

export function deleteAttendanceById(id, cb) {
    return async (dispatch) => {
        dispatch(attendanceAction.deleteAttendanceById())
        try {
            await fetch(attendanceApi.deleteAttendanceById.api.replace("{{id}}", id), attendanceApi.deleteAttendanceById.method)

            dispatch(attendanceAction.deleteAttendanceByIdSuccess())

            // const snackbar = {
            //     message: "Successfully deleted!",
            //     options: {
            //         variant: 'success',
            //     }
            // }

            // dispatch(snackbarAction.addSnackbar(snackbar))
            if (cb) cb()
        } catch (error) {
            dispatch(attendanceAction.deleteAttendanceByIdFailure())
        }
    }
}

export function deleteManyByIds(ids, cb) {
    return async (dispatch) => {
        dispatch(attendanceAction.batchDeleteAttendance())
        try {
            await fetch(attendanceApi.batchDeleteAttendance.api, attendanceApi.batchDeleteAttendance.method, {
                ids: [...ids]
            })

            dispatch(attendanceAction.batchDeleteAttendanceSuccess())

            // const snackbar = {
            //     message: "Successfully deleted!",
            //     options: {
            //         variant: 'success',
            //     }
            // }

            // dispatch(snackbarAction.addSnackbar(snackbar))
            if (cb) cb()
        } catch (error) {
            console.log(error)
            dispatch(attendanceAction.batchDeleteAttendanceFailure())
        }
    }
}

export function putAttendanceById(id, checkInTime, checkOutTime, status, cb) {
    return async (dispatch) => {
        dispatch(attendanceAction.putAttendanceById())
        const data = {};

        if (checkInTime) data.check_in_time = checkInTime;
        if (checkOutTime) data.check_out_time = checkOutTime;
        if (status) data.status = status;

        try {
            const res = await fetch(attendanceApi.putAttendanceById.api.replace("{{id}}", id), attendanceApi.putAttendanceById.method, data)

            dispatch(attendanceAction.putAttendanceByIdSuccess())

            // const snackbar = {
            //     message: "Successfully updated attendance record!",
            //     options: {
            //         variant: 'success',
            //     }
            // }

            // dispatch(snackbarAction.addSnackbar(snackbar))
            if (cb) cb(res.data)
        } catch (error) {
            dispatch(attendanceAction.putAttendanceByIdFailure())
        }
    }
}

export function updateManyByIds(ids, checkInTime, checkOutTime, status, cb) {
    return async (dispatch) => {
        dispatch(attendanceAction.batchUpdateAttendance())
        try {
            const data = {
                ids: [...ids],
            }

            if (checkInTime) data.check_in_time = checkInTime;
            if (checkOutTime) data.check_out_time = checkOutTime;
            if (status) data.status = status;


            const res = await fetch(attendanceApi.batchUpdateAttendance.api, attendanceApi.batchUpdateAttendance.method, data)

            dispatch(attendanceAction.batchUpdateAttendanceSuccess())

            // const snackbar = {
            //     message: "Successfully updated attendance record!",
            //     options: {
            //         variant: 'success',
            //     }
            // }

            // dispatch(snackbarAction.addSnackbar(snackbar))

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(attendanceAction.batchUpdateAttendanceFailure())
        }
    }
}