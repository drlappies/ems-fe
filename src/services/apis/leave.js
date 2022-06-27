import { methods } from '../axios/index'

const leaveApi = {
    postLeave: {
        api: "/api/leave",
        method: methods.POST
    },
    postApply: {
        api: "/api/leave/apply",
        method: methods.POST
    },
    postApplyMany: {
        api: "/api/leave/apply_many",
        method: methods.POST
    },
    getLeave: {
        api: "/api/leave",
        method: methods.GET
    }
}

export default leaveApi