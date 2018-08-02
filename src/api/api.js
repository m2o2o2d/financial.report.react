import Server from './server';

class API extends Server {

	/* Get user data */
	getUser(params = {}) {
		try {
			// let result = this.axios('get', `/userdata/${params.userID}`);
			// if(result && (result.data instanceof Object) && result.http_code === 200) {
			// 	return result.data;
			// } else {
			// 	let err = {
			// 		tip: 'Failed to get user data',
			// 		response: result,
			// 		data: params
			// 	};
			// 	throw err;
			// }

			// this.axios('get', `/userdata/${params.userID}`).then(
			// 	res => {
			// 		return res.data;
			// 	},
			// 	error => {
			// 		let err = {
			// 			tip: 'Failed to get user data',
			// 			response: error.response,
			// 			data: params
			// 		};
			// 		throw err;
			// 	}
			// );
			return {UserID:"10001"};
		} catch(err) {
			throw err;
		}
	}
}

export default new API();