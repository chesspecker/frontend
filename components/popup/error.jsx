import Image from 'next/image.js';
import ButtonSecondary from '../button/secondary.jsx';
import INDEX_STYLE from './error.module.scss';
import supress from '@/public/images/supress.svg';
import PopupContainer from '@/layouts/popup/container.jsx';
import PopupBackground from '@/layouts/popup/background.jsx';

export default function ErrorPopup({onClick}) {
	return (
		<PopupBackground>
			<PopupContainer>
				<Image src={supress} width={70} height={70} />
				<h3 className={INDEX_STYLE.title}>Sorry your set must have a name.</h3>
				<ButtonSecondary onClick={onClick}>RETRY</ButtonSecondary>
			</PopupContainer>
		</PopupBackground>
	);
}
