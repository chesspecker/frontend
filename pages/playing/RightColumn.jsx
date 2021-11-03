import {useState} from 'react';
/* eslint-disable-next-line */
import {BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs';
import router from 'next/router.js';
import {ProgressBarCircle} from '../../components/layouts/progress-bar/ProgressBarCirle.jsx';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import style from './RightColumn.module.scss';

export default function RightColumn({
	percentage,
	text,
	solutionVisible,
	nextMove,
	changeSoundStatus,
	soundStatus,
	gameLink,
}) {
	const [solutionDisplayed, setSolutionDisplayed] = useState(false);
	if (!text) return null;
	if (!gameLink) return null;

	const handleClick = () => {
		if (solutionDisplayed) {
			setSolutionDisplayed(() => false);
		} else {
			setSolutionDisplayed(() => true);
			setTimeout(() => {
				setSolutionDisplayed(() => false);
			}, 3000);
		}
	};

	return (
		<div className={style.container}>
			<div className={style.content}>
				<h3 className={style.progression_title}>
					Progression{' '}
					<span className={style.icon} onClick={changeSoundStatus}>
						{soundStatus ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
					</span>
				</h3>
				<ProgressBarCircle
					colour='green'
					percentage={percentage}
					colourFont='DarkGray'
				/>
				<div className={style.turn}>
					<p className={style.text_title}>{text.title}</p>
					<p>{text.subtitle}</p>
				</div>
				<div>
					{!solutionVisible && <BtnSecondary>NO CHEATING</BtnSecondary>}
				</div>
				<div>
					{solutionVisible && !solutionDisplayed && (
						<BtnSecondary onClick={handleClick}>SOLUTION 🧩</BtnSecondary>
					)}
				</div>
				<div>
					{solutionVisible && solutionDisplayed && (
						<BtnSecondary onClick={handleClick}>{nextMove}</BtnSecondary>
					)}
				</div>
				<div>
					<button
						className={style.btn_lichess}
						onClick={() => router.push(gameLink)}
					>
						SEE IN LICHESS
					</button>
				</div>
			</div>
		</div>
	);
}
