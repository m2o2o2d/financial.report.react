import API from '@/api/api';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

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

export const login = (userID, password) => dispatch => {
	API.getUser({userID: userID})
	.then(
		response => {
			if(response.status >= 200 && response.status <300 && response.data !== "") {
				dispatch(loginSuccess(response.data));
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				dispatch(loginFailure("No such a user"));
				throw error;
			}
		}
	)
	.catch(
		error => { console.log("Login failed, ", error); }
	);
};