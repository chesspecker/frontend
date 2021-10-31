import Image from 'next/image.js';
import Btn from '../btn/Btn.jsx';
import supress from '../../../public/images/supress.svg';
import useClock from '../../hooks/useClock.jsx';
import style from './GameSet.module.scss';

function GameSet({sets, setCurrentSet, onDelete}) {
	return (
		<div className={style.set}>
			<h3 className={`${style.title} ${style.tooltip}`}>
				{sets.title.length > 12 ? sets.title.slice(0, 11) + ' ...' : sets.title}
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
						Completed :{' '}
						<span
							className={
								sets.cycles < 1
									? `${style.badge} ${style.badge_secondary}`
									: sets.cycles < 3
									? `${style.badge} ${style.badge_warning}`
									: sets.cycles < 5
									? `${style.badge} ${style.badge_yellow}`
									: `${style.badge} ${style.badge_primary}`
							}
						>
							{sets.cycles} time{sets.cycles > 1 && 's'}
						</span>
					</p>
					<p>
						Difficulty :{' '}
						<span
							className={
								sets.level === 'hard' ||
								sets.level === 'harder' ||
								sets.level === 'hardest'
									? `${style.badge} ${style.badge_warning}`
									: sets.level === 'intermediate' || sets.level === 'normal'
									? `${style.badge} ${style.badge_yellow}`
									: `${style.badge} ${style.badge_primary}`
							}
						>
							{sets.level === 'hard' ||
							sets.level === 'harder' ||
							sets.level === 'hardest'
								? `Hard`
								: sets.level === 'intermediate' || sets.level === 'normal'
								? `Normal`
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
