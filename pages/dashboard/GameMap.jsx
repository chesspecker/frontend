import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import style from './index.module.scss';

function GameMap() {
	const getSets = useSets();
	const [gameSets, setGameSets] = useState([]);
	const {currentUser, updateCurrentSet} = useUserContext();

	console.log(currentUser);

	useEffect(() => {
		setGameSets(() => getSets);

		console.log(currentUser);
	}, []);

	const handleCurrentSet = set => {
		updateCurrentSet(set);
	};

	return (
		<div className={style.container}>
			<h1>Bonsoir</h1>
			<div className={style.gameSet}>
				{gameSets &&
					gameSets.map(s => (
						<GameSet
							sets={s}
							number={gameSets.indexOf(s)}
							id={s._id}
							setId={s._id}
							setCurrentSet={handleCurrentSet}
						/>
					))}
			</div>
		</div>
	);
}

export default GameMap;
