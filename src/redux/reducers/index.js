import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { combineReducers } from 'redux';
import userReducer from './user';
import attendanceReducer from './attendance';

const createRootReducer = (history) => {
    return combineReducers({
        router: createRouterReducer(history),
        user: userReducer,
        attendance: attendanceReducer,
    });
}

export default createRootReducer