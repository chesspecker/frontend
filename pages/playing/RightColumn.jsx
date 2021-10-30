import {useState} from 'react';
import {ProgressBarCircle} from '../../components/layouts/progress-bar/ProgressBarCirle.jsx';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import style from './RightColumn.module.scss';

export default function RightColumn({percentage, solutionVisible, nextMove}) {
	const [solutionDisplayed, setSolutionDisplayed] = useState(false);

	const handleClick = () => {
		setSolutionDisplayed(bool => !bool);
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
