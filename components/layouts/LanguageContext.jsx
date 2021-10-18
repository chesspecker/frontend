import {createContext} from 'react';

const LanguageContext = createContext({lang: 'fr', setObject: () => {}});

export default LanguageContext;
