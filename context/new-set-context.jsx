import {createContext, useContext} from 'react';

export const NewSetContext = createContext({
	newSet: {},
	updateNewSetOptions: () => {},
	updateNewSetSize: () => {},
	updateNewSetTitle: () => {},
});

// Export useContext Hook.
export function useNewSetContext() {
	return useContext(NewSetContext);
}
