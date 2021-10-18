import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import style from './index.module.scss';

function GameMap() {
	const Sets = useSets();
	const data = useUserContext();

	useEffect(() => {
		console.log(data.currentUser);
	});

	const handleCurrentSet = set => {
		updateCurrentSet(set);
		console.log(currentUser);
	};

	return (
		<div className={style.container}>
			<h1>Bonsoir</h1>
			<div className={style.gameSet}>
				{Sets &&
					Sets.map(s => (
						<GameSet
							sets={s}
							number={Sets.indexOf(s)}
							id={s._id}
							setCurrentSet={handleCurrentSet}
						/>
					))}
			</div>
		</div>
	);
}

export default GameMap;
