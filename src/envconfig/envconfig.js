let baseURL;
if(process.env.NODE_ENV === 'development') {
	baseURL = 'http://localhost:3000/api';
} else {
	baseURL = '';
}

export default {baseURL};