// Components/common/MenuProvider.js
import {createContext, useContext, useState} from 'react';

// Create Context object.
export const UserContext = createContext({
	currentUser: {},
	updateCurrentUserName: () => {},
	updateCurrentSet: () => {},
});

// Export useContext Hook.
export function useUserContext() {
	return useContext(UserContext);
}
