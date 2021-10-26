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
					You can't choose Healthy Mix and other themes. We will fill your set
					with various puzzles from random themes.
				</h3>
				<BtnSecondary onClick={onClick}>RETURN</BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopupNewSet;
