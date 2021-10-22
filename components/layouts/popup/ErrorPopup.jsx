import React from 'react';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';
import style from './ErrorPopup.module.scss';

function ErrorPopup({onClick}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<h3 className={style.title}>
					Sorry your set must contain between 20 and 40 puzzle
				</h3>
				<BtnSecondary onClick={onClick}> Retry </BtnSecondary>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopup;
