import router from 'next/router.js';
import {useState, useEffect} from 'react';
import http from '@/lib/http.js';

export default function useSetsDashboard() {
	const api = process.env.API;
	const [puzzleSet, setPuzzleSet] = useState([]);

	useEffect(() => {
		const getSets = async () => {
			try {
				const response = await http.get(`${api}/set/dashboard`, {
					withCredentials: true,
				});
				setPuzzleSet(() => response.data);
			} catch (error) {
				if (error.message === 'Request failed with status code 403') {
					router.push(`${api}/auth/logout`);
				}

				return console.log(error.message);
			}
		};

		getSets();
	}, [api]);

	return puzzleSet;
}
