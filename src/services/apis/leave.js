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
    },
    putLeaveById: {
        api: "/api/leave/{{id}}",
        method: methods.PUT
    },
    batchUpdateLeave: {
        api: "/api/leave/batch_update",
        method: methods.POST
    },
    deleteLeaveById: {
        api: "/api/leave/{{id}}",
        method: methods.DELETE
    },
    batchDeleteLeave: {
        api: "/api/leave/batch_delete",
        method: methods.POST
    }
}

export default leaveApi