import {useState} from 'react';
import ProgressBarCircle from '../progress-bar/index.jsx';
import ButtonSecondary from '../button/secondary.jsx';
import STYLE from './right-column.module.scss';

export default function RightColumn({
	percentage,
	text,
	isComplete,
	solutionVisible,
	nextMove,
	moveToNext,
	autoMove,
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
		<div className={STYLE.container}>
			<div className={STYLE.content}>
				<h3 className={STYLE.progression_title}>Progression </h3>
				<ProgressBarCircle
					colour='green'
					percentage={percentage}
					colourFont='DarkGray'
				/>
				<div className={STYLE.turn}>
					<p className={STYLE.text_title}>{text.title}</p>
					<p>{text.subtitle}</p>
				</div>
				<div>
					{!solutionVisible && !isComplete && (
						<ButtonSecondary>NO CHEATING</ButtonSecondary>
					)}
				</div>
				<div>
					{solutionVisible && !isComplete && !solutionDisplayed && (
						<ButtonSecondary onClick={handleClick}>SOLUTION 🧩</ButtonSecondary>
					)}
				</div>
				<div>
					{solutionVisible && !isComplete && solutionDisplayed && (
						<ButtonSecondary onClick={handleClick}>{nextMove}</ButtonSecondary>
					)}
				</div>
				<div>
					{isComplete && (
						<ButtonSecondary onClick={moveToNext}>NEXT PUZZLE</ButtonSecondary>
					)}
				</div>
				<div>
					{isComplete && !autoMove && (
						<button
							type='button'
							className={STYLE.btn_lichess}
							onClick={() => window.open(gameLink, '_blank')}
						>
							SEE IN LICHESS
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
