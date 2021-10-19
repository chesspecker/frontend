import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';
import {useUserContext} from '../context/UserContext.jsx';

export default function useUser() {
	const api = process.env.API;
	const [user, setUser] = useState({});
	const {updateCurrentUserName} = useUserContext();

	useEffect(() => {
		const getUser = async () => {
			const {data: user} = await http.get(`${api}/user`, {
				withCredentials: true,
			});
			setUser(() => {
				updateCurrentUserName(user.name);
				return user;
			});
		};

		getUser();
	}, []);

	return user;
}
