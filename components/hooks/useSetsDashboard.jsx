import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';

export default function useSetsDashboard() {
	const api = process.env.API;
	const [puzzleSet, setPuzzleSet] = useState([]);

	useEffect(() => {
		const getSets = async () => {
			const {data: sets} = await http.get(`${api}/set/dashboard`, {
				withCredentials: true,
			});
			setPuzzleSet(() => sets);
		};

		getSets();
	}, []);

	return puzzleSet;
}
