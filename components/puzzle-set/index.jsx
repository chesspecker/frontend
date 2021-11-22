import Image from 'next/image.js';
import Tippy from '@tippyjs/react';
import Button from '../button/index.jsx';
import INDEX_STYLE from './index.module.scss';
import supress from '@/public/images/supress.svg';
import useClock from '@/hooks/use-clock.jsx';
import 'tippy.js/dist/tippy.css';

function GameSet({sets, setCurrentSet, onDelete}) {
	return (
		<div className={INDEX_STYLE.set}>
			<Tippy content={sets.title}>
				<h3 className={`${INDEX_STYLE.title}`}>
					{sets.title.length > 12
						? sets.title.slice(0, 11) + ' ...'
						: sets.title}
				</h3>
			</Tippy>
			<div className={INDEX_STYLE.list}>
				<div className={INDEX_STYLE.supress}>
					<Image src={supress} onClick={() => onDelete(sets._id)} />
				</div>
				<Tippy content='Current time'>
					<div className={INDEX_STYLE.list_element}>
						⏲: {useClock(sets.currentTime)}
					</div>
				</Tippy>
				<Tippy content='Accuracy'>
					<div className={INDEX_STYLE.list_element}>
						🎯 : {Math.round(sets.accuracy * 100)} %
					</div>
				</Tippy>
			</div>
			<div className={INDEX_STYLE.informations}>
				<div>Best time : {useClock(sets.bestTime)}</div>
				<div>
					<p>
						Completed :{' '}
						<span
							className={
								sets.cycles < 1
									? `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_secondary}`
									: sets.cycles < 3
									? `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_warning}`
									: sets.cycles < 5
									? `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_yellow}`
									: `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_primary}`
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
									? `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_warning}`
									: sets.level === 'intermediate' || sets.level === 'normal'
									? `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_yellow}`
									: `${INDEX_STYLE.badge} ${INDEX_STYLE.badge_primary}`
							}
						>
							{sets.level}
						</span>
					</p>
				</div>
			</div>
			<Button onClick={setCurrentSet}>
				{sets.currentTime === 0 ? 'START ⚔️' : 'RESUME 🗡'}
			</Button>
		</div>
	);
}

export default GameSet;
