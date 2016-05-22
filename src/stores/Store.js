import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import MainAppReducer from '../reducers/reducers';

let loggerMiddleware = createLogger();

let store = createStore(
	MainAppReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

export default store;