import axios from 'axios';

const HttpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default HttpService;
