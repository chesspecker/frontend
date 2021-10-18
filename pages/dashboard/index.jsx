import React, {useState, useEffect, useContext} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import LanguageContext from '../../components/layouts/LanguageContext.jsx';
import GameMap from './GameMap.jsx';

function Dashboard(props) {
	const [language, setLanguage] = useState('en');


	return (
		<PageHeader>
			<LanguageContext.Provider value={{language, setLanguage}}>
				<GameMap />
			</LanguageContext.Provider>
		</PageHeader>
	);
}

export default Dashboard;
