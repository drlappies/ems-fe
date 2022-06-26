import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { combineReducers } from 'redux';
import userReducer from './user';
import attendanceReducer from './attendance';
import leaveReducer from './leave'

const createRootReducer = (history) => {
    return combineReducers({
        router: createRouterReducer(history),
        user: userReducer,
        attendance: attendanceReducer,
        leave: leaveReducer,
    });
}

export default createRootReducer