import API from '@/api/api';
import { persistor } from '../store';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const loginLoading = (isLoading) => {
	return {
		type: LOGIN_LOADING,
		isLoading: isLoading
	};
};

const loginSuccess = (user) => {
	return {
		type: LOGIN_SUCCESS,
		user
	};
};

const loginFailure = (error) => {
	return {
		type: LOGIN_FAILURE,
		error
	};
};

export const logout = () => {
	// persistor.purge();
	return {
		type: LOGOUT
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR
	};
};

export const login = (userID, password) => dispatch => {
	API.getUser({userID: userID})
	.then(
		response => {
			if(response.status >= 200 && response.status <300 && response.data !== "") {
				dispatch(loginSuccess(response.data));
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				dispatch(loginFailure("用户不存在"));
				throw error;
			}
		}
	)
	.catch(
		error => { console.log("Login failed, ", error); }
	);
};
