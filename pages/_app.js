import '../styles/globals.css';
import {useState} from 'react';
import LanguageContext from '../components/layouts/LanguageContext.jsx';

function MyApp({Component, pageProps}) {
	const [language, setLanguage] = useState('en');

	return (
		<LanguageContext.Provider value={{language, setLanguage}}>
			<Component {...pageProps} />
		</LanguageContext.Provider>
	);
}

export default MyApp;
