import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';


export const history = createBrowserHistory();

const reduxLogger = createLogger();

export const store = createStore(createRootReducer(history), {}, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), reduxLogger)))