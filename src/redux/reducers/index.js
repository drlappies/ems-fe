import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { combineReducers } from 'redux';
import userReducer from './user';
import attendanceReducer from './attendance';
import leaveReducer from './leave'
import employeeReducer from './employee';
import payrollReducer from './payroll';

const createRootReducer = (history) =>
    combineReducers({
        router: createRouterReducer(history),
        user: userReducer,
        attendance: attendanceReducer,
        leave: leaveReducer,
        employee: employeeReducer,
        payroll: payrollReducer,
    });


export default createRootReducer