import {useState} from 'react';
import {ProgressBarCircle} from '../../components/layouts/progress-bar/ProgressBarCirle.jsx';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import style from './RightColumn.module.scss';

export default function RightColumn({
	percentage,
	text,
	solutionVisible,
	nextMove,
}) {
	const [solutionDisplayed, setSolutionDisplayed] = useState(false);
	if (!text) return null;

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
				<h3 className={style.progression_title}>Progression</h3>
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
			</div>
		</div>
	);
}
