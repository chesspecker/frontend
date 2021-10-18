import React, {useState, useEffect, useContext} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameMap from './GameMap.jsx';

function Dashboard(props) {
	const [language, setLanguage] = useState('en');

	return (
		<PageHeader>
			<GameMap />
		</PageHeader>
	);
}

export default Dashboard;
