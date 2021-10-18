// Components/common/MenuProvider.js
import {createContext, useContext} from 'react';

// Create Context object.
const UserContext = createContext();

// Export Provider.
export function UserProvider(props) {
	const {value, children} = props;

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Export useContext Hook.
export function useUserContext() {
	return useContext(UserContext);
}
