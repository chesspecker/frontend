import '../styles/globals.css';
import LanguageContext from '../components/layouts/LanguageContext';
import {useState} from 'react';

function MyApp({Component, pageProps}) {
	const [language, setLanguage] = useState('en');

	return (
		<LanguageContext.Provider value={{language, setLanguage}}>
			<Component {...pageProps} />
		</LanguageContext.Provider>
	);
}

export default MyApp;
