import React from 'react';
import Btn from '../btn/Btn.jsx';
import Stars from '../stars/Stars.jsx';
import style from './GameSet.module.scss';

function GameSet({sets, number, setCurrentSet}) {
	return (
		<div className={style.set}>
			<h3 className={style.title}>{sets.title}</h3>
			<div className={style.list}>
				<div className={style.list_element}>🏆: 24:37</div>
				<div className={style.list_element}>⛔ : 18</div>
			</div>
			<Stars />
			<Btn onClick={setCurrentSet}>Start</Btn>
		</div>
	);
}

export default GameSet;
