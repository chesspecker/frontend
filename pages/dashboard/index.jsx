import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import style from './index.module.scss';
// Import UserContext from '../../components/contexts/user-context.js';

function Dashboard(props) {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);
	// Const {language, setLanguage} = useContext(UserContext);

	('bark');

	useEffect(() => {
		setGameSets(() => getSets);
	});

	return (
		<PageHeader>
			<div className={style.container}>
				<div className={style.gameSet}>
					{gameSets &&
						gameSets.map(s => (
							<GameSet
								sets={s}
								number={gameSets.indexOf(s)}
								id={s._id}
								setId={s._id}
							/>
						))}
				</div>
			</div>
		</PageHeader>
	);
}

export default Dashboard;
