import { methods } from '../axios/index'

const payrollApi = {
    postPayroll: {
        api: "/api/payroll",
        method: methods.POST
    },
    getPayroll: {
        api: "/api/payroll",
        method: methods.GET
    },
    putPayrollById: {
        api: "/api/payroll/{{id}}",
        method: methods.PUT
    },
    deletePayrollById: {
        api: "/api/payroll/{{id}}",
        method: methods.DELETE
    },
    batchUpdatePayroll: {
        api: "/api/payroll/batch_update",
        method: methods.POST
    },
    batchDeletePayroll: {
        api: "/api/payroll/batch_delete",
        method: methods.POST
    }
}

export default payrollApi