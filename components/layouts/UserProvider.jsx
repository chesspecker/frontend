import React, {createContext, useState, useReducer} from 'react';

import {UserContext} from '../contexts/user-context.js';

export function UserProvider({children}) {
	const [language, setLanguage] = useState('en');
	const value = {language, setLanguage};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
