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
			<h3 className={`${style.title} ${style.tooltip}`}>
				{sets.title.length > 13 ? sets.title.slice(0, 12) + ' ...' : sets.title}
				<span className={style.tooltiptext}>{sets.title}</span>
			</h3>
			<div className={style.list}>
				<div className={style.supress}>
					<Image src={supress} onClick={() => onDelete(sets._id)} />
				</div>
				<div className={style.list_element}>
					⏲: {useClock(sets.currentTime)}
				</div>
				<div className={style.list_element}>
					🎯 : {Math.round(sets.accuracy * 100)} %
				</div>
			</div>
			<div className={style.informations}>
				<div>Best time : {useClock(sets.bestTime)}</div>
				<div>
					<p>
						Status :{' '}
						<span
							className={
								sets.currentTime === 0
									? `${style.badge} ${style.badge_secondary}`
									: `${style.badge} ${style.badge_primary}`
							}
						>
							{sets.tries === 0
								? sets.currentTime === 0
									? 'Not started'
									: 'Playing'
								: sets.currentTime === 0
								? 'Finished'
								: 'Playing'}
						</span>
					</p>
					<p>
						Difficulty :{' '}
						<span
							className={
								sets.level === 'hard'
									? `${style.badge} ${style.badge_warning}`
									: sets.level === 'intermediate'
									? `${style.badge} ${style.badge_yellow}`
									: `${style.badge} ${style.badge_primary}`
							}
						>
							{sets.level === 'hard'
								? `Hard`
								: sets.level === 'intermediate'
								? `Intermediate`
								: `Easy`}
						</span>
					</p>
				</div>
			</div>
			<Btn onClick={setCurrentSet}>
				{sets.currentTime === 0 ? 'START ⚔️' : 'RESUME 🗡'}
			</Btn>
		</div>
	);
}

export default GameSet;
