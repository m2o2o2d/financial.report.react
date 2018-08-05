import * as login from './action';

let initialState = {
	user: null,
	isAuthenticated: false,
	error: null
};

export const loginData = (state = initialState, action = {}) => {
	switch(action.type) {
		case login.LOGIN_LOADING:
			return {...state, isLoading: action.isLoading};
		case login.LOGIN_SUCCESS:
			return {...state, isAuthenticated: true, user: action.user, error: null};
		case login.LOGIN_FAILURE:
			return {...state, isAuthenticated: false, user: null, error: action.error};
		case login.LOGOUT:
			return {...state, isAuthenticated: false, user: null};
		case login.CLEAR_ERROR:
			return {...state, error: null};
		default:
			return state;
	}
};