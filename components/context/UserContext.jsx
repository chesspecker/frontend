// Components/common/MenuProvider.js
import {createContext, useContext} from 'react';

// Create Context object.
export const UserContext = createContext();

// Export useContext Hook.
export function useUserContext() {
	return useContext(UserContext);
}
