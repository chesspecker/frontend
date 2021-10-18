import React from 'react';
import Btn from '../btn/Btn.jsx';
import style from './GameSet.module.scss';

function GameSet({set, number}) {
	return (
		<>
			<div className={style.set}>
				<h3 className={style.title}>Set n°{number}</h3>
				<ul className={style.list}>
					<li className={style.list_element}>Best time :</li>
					<li className={style.list_element}>Mistake :</li>
					<li className={style.list_element}>Level :</li>
				</ul>
			</div>
			<Btn>Start</Btn>
		</>
	);
}

export default GameSet;
