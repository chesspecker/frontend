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
				<h3 className={style.title}>Sorry your set must have a name.</h3>
				<BtnSecondary onClick={onClick}>RETRY</BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopup;
