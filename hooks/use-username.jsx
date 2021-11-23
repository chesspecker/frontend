import {useState, useEffect} from 'react';
import http from '@/lib/http.js';

export default function useUserName() {
	const api = process.env.API;
	const [userName, setUserName] = useState('');

	useEffect(() => {
		const getUserName = async () => {
			try {
				const response = await http.get(`${api}/user/name`, {
					withCredentials: true,
				});
				setUserName(() => response.data.name);
			} catch (error) {
				return console.log(error);
			}
		};

		getUserName();
	}, [api]);

	return userName;
}
