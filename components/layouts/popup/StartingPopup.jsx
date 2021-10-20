import BtnSecondary from '../btn/BtnSecondary.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import style from './StartingPopup.module.scss';

function StartingPopup({onStart}) {
	return (
		<BackgroundPopup>
			<div className={style.content}>
				<p>Try to solve all the puzzles as fast as possible! ⏲</p>
				<BtnSecondary onClick={onStart}> START 🔥 </BtnSecondary>
			</div>
		</BackgroundPopup>
	);
}

export default StartingPopup;
