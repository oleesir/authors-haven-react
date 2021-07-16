import {
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	USER_LOADING,
	USER_LOADED,
	USER_LOADED_FAILURE,
	LOGIN_FAILURE,
} from '../actions/actionTypes/authActionTypes.js';

const initialState = {
	user: null,
	isLoading: false,
	isAuthenticated: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case SIGNUP_SUCCESS:
		case LOGIN_SUCCESS:
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case SIGNUP_FAILURE:
		case LOGIN_FAILURE:
		case USER_LOADED_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				error: action.payload,
				user: null,
			};
		default:
			return state;
	}
};
