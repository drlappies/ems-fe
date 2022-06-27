import fetch from '../../services/axios/index';
import employeeApi from '../../services/apis/employee';
import * as employeeAction from '../actions/employee'
import moment from 'moment'

export function getEmployee(offset, limit) {
    return async (dispatch) => {
        dispatch(employeeAction.getEmployee())
        try {
            const res = await fetch(employeeApi.getEmployee.api, employeeApi.getEmployee.method, {
                offset: offset,
                limit: limit
            })

            const payload = {
                employeeList: res.data.result
            }

            dispatch(employeeAction.getEmployeeSuccess(payload))
        } catch (error) {
            console.log(error)
            dispatch(employeeAction.getEmployeeFailure(error))
        }
    }
}

export function getEmployeeTable(offset, limit, orderBy, order, search, role, mindate, maxdate) {
    return async (dispatch) => {
        dispatch(employeeAction.getEmployeeTable())
        try {
            if (role === "any") role = ""

            const res = await fetch(employeeApi.getEmployee.api, employeeApi.getEmployee.method, {
                offset: offset,
                limit: limit,
                orderBy: orderBy,
                order: order,
                search: search,
                role: role,
                mindate: mindate,
                maxdate: maxdate,
            })

            const payload = {
                employeeTable: res.data.result.map(el => {
                    return {
                        ...el,
                        joined_date: moment(el.joined_date).format("YYYY-MM-DD")
                    }
                }),
                employeeTableCount: parseInt(res.data.count.count)
            }

            dispatch(employeeAction.getEmployeeTableSuccess(payload))
        } catch (error) {
            dispatch(employeeAction.getEmployeeTableFailure(error))
        }
    }
}

export function postEmployee(username, password, firstname, lastname, startWorkTime, endWorkTime, joinedDate, monthlySalary, role, cb) {
    return async (dispatch) => {
        dispatch(employeeAction.postEmployee())
        try {
            const data = {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                start_work_time: startWorkTime,
                end_work_time: endWorkTime,
                joined_date: joinedDate,
                monthly_salary: monthlySalary,
                role: role
            }

            const res = await fetch(employeeApi.postEmployee.api, employeeApi.postEmployee.method, data)

            dispatch(employeeAction.postEmployeeSuccess())
            if (cb) cb(res.data)
        } catch (error) {
            dispatch(employeeAction.postEmployeeFailure(error))
        }
    }
}

export function putEmployeeById(id, username, password, firstname, lastname, startWorkTime, endWorkTime, joinedDate, monthlySalary, role, cb) {
    return async (dispatch) => {
        dispatch(employeeAction.putEmployeeById())
        try {
            const data = {}

            if (username) data.username = username
            if (password) data.password = password
            if (firstname) data.firstname = firstname
            if (lastname) data.lastname = lastname
            if (startWorkTime) data.start_work_time = startWorkTime
            if (endWorkTime) data.end_work_time = endWorkTime
            if (joinedDate) data.joined_date = joinedDate
            if (monthlySalary) data.monthly_salary = monthlySalary
            if (role) data.role = role

            const res = await fetch(employeeApi.putEmployeeById.api.replace("{{id}}", id), employeeApi.putEmployeeById.method, data)

            dispatch(employeeAction.putEmployeeByIdSuccess())
            if (cb) cb(res.data)
        } catch (error) {
            dispatch(employeeAction.putEmployeeByIdFailure(error))
        }
    }
}

export function batchUpdateEmployee(ids, startWorkTime, endWorkTime, monthlySalary, role, cb) {
    return async (dispatch) => {
        dispatch(employeeAction.batchUpdateEmployee())
        try {

            const data = { ids: [...ids] }

            if (startWorkTime) data.start_work_time = startWorkTime
            if (endWorkTime) data.end_work_time = endWorkTime
            if (monthlySalary) data.monthly_salary = monthlySalary
            if (role) data.role = role

            const res = await fetch(employeeApi.batchUpdateEmployee.api, employeeApi.batchUpdateEmployee.method, data)

            dispatch(employeeAction.batchUpdateEmployeeSuccess())

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(employeeAction.batchUpdateEmployeeFailure(error))
        }
    }
}

export function deleteEmployeeById(id, cb) {
    return async (dispatch) => {
        dispatch(employeeAction.deleteEmployeeById())
        try {
            const res = await fetch(employeeApi.deleteEmployeeById.api.replace("{{id}}", id), employeeApi.deleteEmployeeById.method)

            dispatch(employeeAction.deleteEmployeeByIdSuccess())

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(employeeAction.deleteEmployeeByIdFailure(error))
        }
    }
}

export function batchDeleteEmployee(ids, cb) {
    return async (dispatch) => {
        dispatch(employeeAction.batchDeleteEmployee())
        try {
            const data = { ids: [...ids] }

            const res = await fetch(employeeApi.batchDeleteEmployee.api, employeeApi.batchDeleteEmployee.method, data)

            dispatch(employeeAction.batchDeleteEmployeeSuccess())

            if (cb) cb(res.data)
        } catch (error) {
            dispatch(employeeAction.batchDeleteEmployeeFailure(error))
        }
    }
}