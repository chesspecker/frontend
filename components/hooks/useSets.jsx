import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';

export default function useSets() {
	const api = process.env.API;
	const [gameSet, setGameSet] = useState([]);

	useEffect(() => {
		const getSets = async () => {
			const {data: sets} = await http.get(`${api}/set`, {
				withCredentials: true,
			});
			setGameSet(() => sets);
		};

		getSets();
	}, []);

	return gameSet;
}
