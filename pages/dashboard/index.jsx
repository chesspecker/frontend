import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameMap from './GameMap.jsx';

function Dashboard(props) {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);

	useEffect(() => {
		setGameSets(() => getSets);
	});

	return (
		<PageHeader>
			<GameMap />
		</PageHeader>
	);
}

export default Dashboard;
