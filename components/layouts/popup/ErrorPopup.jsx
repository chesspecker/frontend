import React from 'react';
import Image from 'next/image.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import error from '../../../public/images/supress.svg';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';
import style from './ErrorPopup.module.scss';

function ErrorPopup({onClick}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<Image src={error} width={70} height={70} />
				<h3 className={style.title}>
					Sorry your set must contain between 20 and 40 puzzles
				</h3>
				<BtnSecondary onClick={onClick}> Retry </BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopup;
