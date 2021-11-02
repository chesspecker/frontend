import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';

export default function useSets() {
	const api = process.env.API;
	const [gameSet, setGameSet] = useState([]);

	useEffect(() => {
		const getSets = async () => {
			let response;
			try {
				response = await http.get(`${api}/set`, {
					withCredentials: true,
				});
			} catch (error) {
				return console.log(error);
			}

			const sets = response.data;
			setGameSet(() => sets);
		};

		getSets();
	}, [api]);

	return gameSet;
}
