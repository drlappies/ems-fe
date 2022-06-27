import { methods } from '../axios/index'

const employeeApi = {
    getEmployee: {
        api: "/api/employee",
        method: methods.GET
    },
    postEmployee: {
        api: "/api/employee",
        method: methods.POST
    },
    putEmployeeById: {
        api: "/api/employee/{{id}}",
        method: methods.PUT
    },
    deleteEmployeeById: {
        api: "/api/employee/{{id}}",
        method: methods.DELETE
    },
    batchUpdateEmployee: {
        api: "/api/employee/batch_update",
        method: methods.POST
    },
    batchDeleteEmployee: {
        api: "/api/employee/batch_delete",
        method: methods.POST
    }
}

export default employeeApi