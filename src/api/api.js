import axios from 'axios';
import envconfig from '@/envconfig/envconfig';

class API {

	/* Get user data */
	getUser(params = {}) {
		return axios.get(envconfig.baseURL + `/userdata/${params.userID}`);
	}
}

export default new API();