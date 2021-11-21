import {useState, useEffect} from 'react';
import http from '@/lib/http.js';
import {useUserContext} from '@/context/user-context.jsx';

export default function useUserName() {
	const api = process.env.API;
	const [userName, setUserName] = useState('');
	const {updateCurrentUserName} = useUserContext();

	useEffect(() => {
		const getUserName = async () => {
			try {
				const response = await http.get(`${api}/user/name`, {
					withCredentials: true,
				});
				updateCurrentUserName(response.data.name);
				setUserName(() => response.data.name);
			} catch (error) {
				return console.log(error);
			}
		};

		getUserName();
	}, [updateCurrentUserName, api]);

	return userName;
}
