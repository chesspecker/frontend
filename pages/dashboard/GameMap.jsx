import React from 'react';
import Router from 'next/router.js';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import style from './index.module.scss';

function GameMap() {
	const sets = useSets();
	const {currentUser, updateCurrentUserName, updateCurrentSet} =
		useUserContext();
	console.log('userContext in gamemap', useUserContext());

	const handleCurrentSet = set => {
		console.log(set);
		updateCurrentSet(set);
		Router.push('/playing');
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
							setCurrentSet={() => handleCurrentSet(s._id)}
						/>
					))}
			</div>
		</div>
	);
}

export default GameMap;
