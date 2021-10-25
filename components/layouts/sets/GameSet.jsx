import Image from 'next/image.js';
import Btn from '../btn/Btn.jsx';
import Stars from '../stars/Stars.jsx';
import supress from '../../../public/images/supress.svg';
import useClock from '../../hooks/useClock.jsx';
import style from './GameSet.module.scss';

function GameSet({sets, setCurrentSet, onDelete}) {
	const useRate = (bestTime, length) => {
		return bestTime === 0
			? 0
			: bestTime / length <= 10
			? 3
			: bestTime / length <= 15
			? 2
			: bestTime / length <= 25
			? 1
			: 0;
	};

	return (
		<div className={style.set}>
			<h3 className={style.title}>{sets.title}</h3>
			<div className={style.list}>
				<div className={style.supress}>
					<Image src={supress} onClick={() => onDelete(sets._id)} />
				</div>
				<div className={style.list_element}>
					🏆: {useClock(sets.currentTime)}
				</div>
				<div className={style.list_element}>🔥 : {sets.tries}</div>
			</div>
			<Stars numberStar={useRate(sets.bestTime, sets.length)} />
			<Btn onClick={setCurrentSet}>Start</Btn>
		</div>
	);
}

export default GameSet;
