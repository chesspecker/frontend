import {createContext} from 'react';

const LanguageContext = createContext({
	language: 'fr',
	setLanguage: () => {},
});

export default LanguageContext;
