import {
	REQUEST_REPOS,
	RECEIVE_REPOS,
	/*FETCH_RADAR,
	RECEIVE_RADAR,*/
	RECEIVE_USER
} from "../actions/actions.js";
import { combineReducers } from 'redux';

/*
Initial state
*/

function user(state = {
	isFetching: false,
	user: null
}, action) {
	switch(action.type) {
		case RECEIVE_USER:
			return Object.assign({}, state, {
				user: action.user,
				lastUpdated: action.receivedAt
			});

		default:
			return state;
	}
}

function repos(state = {
	isFetching: false,
	didInvalidate: false,
	repos: []
}, action) {
	switch(action.type) {
		case REQUEST_REPOS:
			return Object.assign({}, state, { 
				isFetching: true, 
				didInvalidate: false 
			});
		case RECEIVE_REPOS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				repos: action.posts,
				lastUpdated: action.receivedAt
			});
		default: 
			return state;
	}
}
 
/* 
function radar(state = {
	items: []
}, action) {
	switch(action.type) {
		case FETCH_RADAR:
			return Object.assign({}, state, {
				isFetching: true
			});
		break;
		case RECEIVE_RADAR:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				repos: action.posts,
				lastUpdated: action.receivedAt
			});
		break;
		default: 
			return state;
	}
}
*/

const MainAppReducer = combineReducers({
	user,
	repos
	//radar
});

export default MainAppReducer;





