import React from 'react';
import Image from 'next/image.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import error from '../../../public/images/supress.svg';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';
import style from './ErrorPopupNewSet.module.scss';

function ErrorPopupNewSet({onClick}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<Image src={error} width={70} height={70} />
				<h3 className={style.title}>
					If you choose Healthy Mix we will fill your set with various puzzles
					from random themes. That's why choosing another theme is not possible.
				</h3>
				<BtnSecondary onClick={onClick}>RETURN</BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopupNewSet;
