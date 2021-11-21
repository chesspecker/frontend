import ButtonSecondary from '../button/secondary.jsx';
import PopupContainer from '@/layouts/popup/container.jsx';
import PopupBackground from '@/layouts/popup/background.jsx';

export default function StartingPopup({onStart}) {
	return (
		<PopupBackground>
			<PopupContainer>
				<p>Try to solve all the puzzles as fast as possible! ⏲</p>
				<ButtonSecondary onClick={onStart}>START 🔥</ButtonSecondary>
			</PopupContainer>
		</PopupBackground>
	);
}
