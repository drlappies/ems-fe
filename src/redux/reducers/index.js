import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { combineReducers } from 'redux';
import userReducer from './user';

const createRootReducer = (history) => {
    return combineReducers({
        router: createRouterReducer(history),
        user: userReducer
    });
}

export default createRootReducer