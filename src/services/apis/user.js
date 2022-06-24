import { methods } from '../axios/index'

const userApi = {
    getUser: {
        api: "/api/user",
        method: methods.GET
    },
    getUserAttendance: {
        api: "/api/user/attendance",
        method: methods.GET
    },
    getUserLeave: {
        api: "/api/user/leave",
        method: methods.GET
    },
    getUserPayroll: {
        api: "/api/user/payroll",
        method: methods.GET
    },
}

export default userApi