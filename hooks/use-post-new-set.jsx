import http from '../services/http-service.js';

export default function usePostNewSet({newSet}) {
	const api = process.env.API;
	const postSet = async () => {
		try {
			await http.post(`${api}/set`, newSet, {
				withCredentials: true,
			});
		} catch (error) {
			return console.log(error);
		}
	};

	postSet();

	return usePostNewSet;
}
