import API from '@/api/api';

export const LOGIN = 'LOGIN';

export const login = (userID, password) => {
	let result = API.getUser({userID: userID});
	if(result.UserID === userID) {
		console.log(result);
	}
	return {
		type: LOGIN
	};
};