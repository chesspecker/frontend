import React from 'react';
import Btn from '../btn/Btn.jsx';
import style from './GameSet.module.scss';

function GameSet(props) {
	return (
		<>
			<div className={style.set}>
				<h3 className={style.title}>Set n°1</h3>
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
