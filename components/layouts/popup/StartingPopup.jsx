import BtnSecondary from '../btn/BtnSecondary.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';

function StartingPopup({onStart}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<p>Try to solve all the puzzles as fast as possible! ⏲</p>
				<BtnSecondary onClick={onStart}>START 🔥</BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default StartingPopup;
