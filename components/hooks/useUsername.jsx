import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';
import {useUserContext} from '../context/UserContext.jsx';

export default function useUserName() {
	const api = process.env.API;
	const [userName, setUserName] = useState('');
	const {updateCurrentUserName} = useUserContext();

	useEffect(() => {
		const getUserName = async () => {
			const {data} = await http.get(`${api}/user/name`, {
				withCredentials: true,
			});
			setUserName(() => {
				updateCurrentUserName(data.name);
				return data.name;
			});
		};

		getUserName();
	}, []);

	return userName;
}
