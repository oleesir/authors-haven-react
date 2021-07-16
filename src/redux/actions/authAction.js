import {
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	CLEAR_ERRORS,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	USER_LOADED_FAILURE,
	USER_LOADED,
	USER_LOADING,
} from '../actions/actionTypes/authActionTypes.js';
import AuthService from '../../services/AuthService';
import setAuthToken from '../../utils/setAuthToken';

export const signup = (formData, onSubmitSuccess, onSubmitFailure) => async (
	dispatch,
) => {
	try {
		const res = await AuthService.signupUser(formData);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data.data,
		});
		onSubmitSuccess();
	} catch (err) {
		dispatch({
			type: SIGNUP_FAILURE,
			payload:
				typeof err.response?.data?.error === 'string'
					? { form: err.response?.data?.error }
					: err.response?.data?.error,
		});
		onSubmitFailure();
	}
};

export const login = (formData, onSubmitSuccess, onSubmitFailure) => async (
	dispatch,
) => {
	try {
		const res = await AuthService.loginUser(formData);
		console.log('SIGNIN', res.data.data);

		localStorage.setItem('token', res.data.data.token);

		console.log('TOKEN', localStorage.token);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data.data,
		});
		onSubmitSuccess();
	} catch (err) {
		dispatch({
			type: LOGIN_FAILURE,
			payload:
				typeof err.response?.data?.error === 'string'
					? { form: err.response?.data?.error }
					: err.response?.data?.error,
		});
		onSubmitFailure();
	}
};

export const loadUser = () => async (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await AuthService.loggedIn();
		console.log('LOGGEDIN', res.data.data);
		console.log('TOKEN', localStorage.token);

		dispatch({
			type: USER_LOADED,
			payload: res.data.data,
		});
	} catch (err) {
		console.log('ACTIONS', err);
		dispatch({
			type: USER_LOADED_FAILURE,
		});
	}
};

export const clearErrors = () => ({
	type: CLEAR_ERRORS,
});
