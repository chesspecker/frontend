import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';

export default function useSetsDashboard() {
	const api = process.env.API;
	const [puzzleSet, setPuzzleSet] = useState([]);

	useEffect(() => {
		const getSets = async () => {
			let response;
			try {
				response = await http.get(`${api}/set/dashboard`, {
					withCredentials: true,
				});
			} catch (error) {
				return console.log(error);
			}

			const sets = response.data;
			setPuzzleSet(() => sets);
		};

		getSets();
	}, []);

	return puzzleSet;
}
