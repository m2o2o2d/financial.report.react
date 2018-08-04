import * as login from './action';

let initialState = {
	user: null,
	isAuthorized: false
};

export const loginData = (state = initialState, action = {}) => {
	switch(action.type) {
		case login.LOGIN_LOADING:
			return {...state, isLoading: action.isLoading};
		case login.LOGIN_SUCCESS:
			return {...state, isAuthorized: true, user: action.user};
		case login.LOGIN_FAILURE:
			return {...state, isAuthorized: false};
		default:
			return state;
	}
};