import Head from 'next/head.js';
import {useState, useMemo} from 'react';
import {UserContext} from '../components/context/UserContext.jsx';
import {NewSetContext} from '../components/context/NewSetContext.jsx';
import '../styles/globals.css';
import '../styles/chessground.css';

function MyApp({Component, pageProps}) {
	const [currentUser, setCurrentUser] = useState({
		name: '',
		id: '',
		currentSet: '',
		newSet: [],
	});

	const [newSet, setNewSet] = useState({
		title: '',
		size: 0,
		themeArray: [],
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

	const updateNewSetOptions = data => {
		setNewSet(rest => {
			return {...rest, themeArray: data};
		});
	};

	const updateNewSetSize = data => {
		setNewSet(rest => {
			return {...rest, size: data};
		});
	};

	const updateNewSetTitle = data => {
		setNewSet(rest => {
			return {...rest, title: data};
		});
	};

	const UserContextValue = useMemo(
		() => ({
			currentUser,
			updateCurrentUserName,
			updateCurrentSet,
		}),
		[currentUser, updateCurrentUserName, updateCurrentSet],
	);

	const newSetContextValue = useMemo(
		() => ({
			newSet,
			updateNewSetOptions,
			updateNewSetSize,
			updateNewSetTitle,
		}),
		[newSet, updateNewSetOptions, updateNewSetSize, updateNewSetTitle],
	);

	return (
		<>
			<Head>
				<title>Chesspecker</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<UserContext.Provider value={UserContextValue}>
				<NewSetContext.Provider value={newSetContextValue}>
					<Component {...pageProps} />
				</NewSetContext.Provider>
			</UserContext.Provider>
		</>
	);
}

export default MyApp;
