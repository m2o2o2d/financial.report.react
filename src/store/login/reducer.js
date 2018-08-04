import * as login from './action';

let initialState = {
	user: null,
	isAuthenticated: false
};

export const loginData = (state = initialState, action = {}) => {
	switch(action.type) {
		case login.LOGIN_LOADING:
			return {...state, isLoading: action.isLoading};
		case login.LOGIN_SUCCESS:
			return {...state, isAuthenticated: true, user: action.user};
		case login.LOGIN_FAILURE:
			return {...state, isAuthenticated: false};
		case login.LOGOUT:
			return {...state, isAuthenticated: false, user: null};
		default:
			return state;
	}
};