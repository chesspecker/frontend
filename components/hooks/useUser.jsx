import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';

export default function useUser() {
	const api = process.env.API;
	const [user, setUser] = useState('');

	useEffect(() => {
		const getUser = async () => {
			const {data: user} = await http.get(`${api}/user`, {
				withCredentials: true,
			});
			setUser(() => user);
			console.log(user);
		};

		getUser();
	}, []);

	return user;
}
