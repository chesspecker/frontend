import {useState} from 'react';
import NavBar from '../NavBar.jsx';
import {UserProvider} from '../context/UserContext.jsx';
import Container from './Container.jsx';

function PageHeader({children}) {
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
		<UserProvider
			value={{currentUser, updateCurrentUserName, updateCurrentSet}}
		>
			<Container>
				<NavBar />
				{children}
			</Container>
		</UserProvider>
	);
}

export default PageHeader;
