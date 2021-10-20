import React from 'react';
import Router from 'next/router.js';
import Image from 'next/image.js';
import Link from 'next/link.js';
import useSets from '../../components/hooks/useSets.jsx';
import GameSet from '../../components/layouts/sets/GameSet.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import Stars from '../../components/layouts/stars/Stars.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import plus from '../../public/images/plus.svg';
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
				<div className={style.set}>
					<Link href='./new-set'>
						<div className={style.bluer}>
							<Image src={plus} />
							<p>Create a new Set</p>
						</div>
					</Link>
					<h3 className={style.title}>Set exemple</h3>
					<div className={style.list}>
						<div className={style.list_element}>🏆: 24:37</div>
						<div className={style.list_element}>⛔ : 18</div>
					</div>
					<Stars />
					<Btn>Start</Btn>
				</div>
			</div>
		</div>
	);
}

export default GameMap;
