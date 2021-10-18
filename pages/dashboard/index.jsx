import React, {useState, useEffect} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import style from './index.module.scss';

function Dashboard(props) {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);

	useEffect(() => {
		setGameSets(() => getSets);
	});

	return (
		<PageHeader>
			<div className={style.container}>
				<div className={style.gameSet}>
					{gameSets &&
						gameSets.map(s => (
							<GameSet sets={s} number={gameSets.indexOf(s)} />
						))}
				</div>
			</div>
		</PageHeader>
	);
}

export default Dashboard;
