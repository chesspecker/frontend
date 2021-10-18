import React, {useState, useEffect, useContext} from 'react';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {
	useUserContext,
	UserContext,
} from '../../components/context/UserContext.jsx';
import style from './index.module.scss';

function GameMap() {
	const sets = useSets();
	const {currentUser, updateCurrentUserName, updateCurrentSet} =
		useUserContext();

	const handleCurrentSet = set => {
		updateCurrentSet(set);
		console.log(currentUser);
	};

	return (
		<div className={style.container}>
			<h1>Bonsoir</h1>
			<div className={style.gameSet}>
				{sets &&
					sets.map(s => (
						<GameSet
							key={s._id}
							sets={s}
							number={sets.indexOf(s)}
							id={s._id}
							setCurrentSet={handleCurrentSet}
						/>
					))}
			</div>
		</div>
	);
}

export default GameMap;
