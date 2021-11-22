import axios from 'axios';

const libHttp = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default libHttp;
