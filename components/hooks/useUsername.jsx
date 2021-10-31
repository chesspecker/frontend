import {useState, useEffect} from 'react';
import http from '../../services/http-service.js';
import {useUserContext} from '../context/UserContext.jsx';

export default function useUserName() {
	const api = process.env.API;
	const [userName, setUserName] = useState('');
	const {updateCurrentUserName} = useUserContext();

	useEffect(() => {
		const getUserName = async () => {
			let response;
			try {
				response = await http.get(`${api}/user/name`, {
					withCredentials: true,
				});
			} catch (error) {
				return console.log(error);
			}

			setUserName(() => {
				updateCurrentUserName(response.data.name);
				return response.data.name;
			});
		};

		getUserName();
	}, []);

	return userName;
}
