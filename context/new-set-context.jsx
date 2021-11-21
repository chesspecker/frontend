import {createContext, useContext} from 'react';

export const NewSetContext = createContext({
	newSet: {},
	updateNewSetOptions: () => {},
	updateNewSetSize: () => {},
	updateNewSetTitle: () => {},
});

export const useNewSetContext = () => useContext(NewSetContext);
