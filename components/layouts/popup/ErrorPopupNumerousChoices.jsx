import Image from 'next/image.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import error from '../../../public/images/supress.svg';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';
import style from './ErrorPopupNumerousChoices.module.scss';

function ErrorPopupNumerousChoices({onClick}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<Image src={error} width={70} height={70} />
				<h3 className={style.title}>
					You can&apos;t choose more than three themes. It&apos;s time to be
					specific about what you want to improve!
				</h3>
				<BtnSecondary onClick={onClick}>RETURN</BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopupNumerousChoices;
