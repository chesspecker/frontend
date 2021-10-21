import Image from 'next/image.js';
import Btn from '../btn/Btn.jsx';
import Stars from '../stars/Stars.jsx';
import supress from '../../../public/images/supress.svg';
import style from './GameSet.module.scss';

function GameSet({sets, _number, setCurrentSet}) {
	return (
		<div className={style.set}>
			<h3 className={style.title}>{sets.title}</h3>
			<div className={style.list}>
				<div className={style.supress}>
					<Image src={supress} />
				</div>
				<div className={style.list_element}>🏆: {sets.bestTime}</div>
				<div className={style.list_element}>⛔ : {sets.tries}</div>
			</div>
			<Stars />
			<Btn onClick={setCurrentSet}>Start</Btn>
		</div>
	);
}

export default GameSet;
