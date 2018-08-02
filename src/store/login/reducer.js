import * as login from './action';

let initialState = {
	loginUser: null,
	error: null
};

export const loginData = (state = initialState, action = {}) => {
	switch(action.type) {
		case login.LOGIN:
			return {...state, error: null};
		default:
			return state;
	}
};