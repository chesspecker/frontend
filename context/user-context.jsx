import {createContext, useContext} from 'react';

export const UserContext = createContext({
	currentUser: {},
	updateCurrentUserName: () => {},
	updateCurrentSet: () => {},
});

export const useUserContext = () => useContext(UserContext);
