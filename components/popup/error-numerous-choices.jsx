import Image from 'next/image.js';
import ButtonWarning from '../button/warning.jsx';
import INDEX_STYLE from './error-numerous-choices.module.scss';
import supress from '@/public/images/supress.svg';
import PopupContainer from '@/layouts/popup/container.jsx';
import PopupBackground from '@/layouts/popup/background.jsx';

export default function ErrorPopupNumerousChoices({onClick}) {
	return (
		<PopupBackground>
			<PopupContainer>
				<Image src={supress} width={70} height={70} />
				<h3 className={INDEX_STYLE.title}>
					You can&apos;t choose more than three themes. It&apos;s time to be
					specific about what you want to improve!
				</h3>
				<ButtonWarning onClick={onClick}>RETURN</ButtonWarning>
			</PopupContainer>
		</PopupBackground>
	);
}
