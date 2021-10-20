import {useEffect} from 'react';
import http from '../../services/http-service.js';

export default function usePostNewSet({newSet}) {
	const api = process.env.API;
	console.log('newset dans le hooks', newSet);

	const postSet = async () => {
		await http.post(`${api}/puzzles/sets`, newSet, {
			withCredentials: true,
		});
	};

	postSet();

	return usePostNewSet;
}
