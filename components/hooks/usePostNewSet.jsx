import http from '../../services/http-service.js';

export default function usePostNewSet({newSet}) {
	const api = process.env.API;
	const postSet = async () => {
		await http.post(`${api}/set`, newSet, {
			withCredentials: true,
		});
	};

	postSet();

	return usePostNewSet;
}
