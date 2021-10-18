import {UserContext} from '../components/context/UserContext.jsx';
import '../styles/globals.css';
import {useState} from 'react';

function MyApp({Component, pageProps}) {
	const [currentUser, setCurrentUser] = useState({
		name: '',
		id: '',
		currentSet: '',
	});

	const updateCurrentUserName = data => {
		setCurrentUser(rest => {
			return {...rest, name: data};
		});
	};

	const updateCurrentSet = data => {
		setCurrentUser(rest => {
			return {...rest, currentSet: data};
		});
	};

	return (
		<UserContext.Provider
			value={{currentUser, updateCurrentUserName, updateCurrentSet}}
		>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
