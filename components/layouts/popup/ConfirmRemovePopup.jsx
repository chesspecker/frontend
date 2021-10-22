import Image from 'next/image.js';

import React from 'react';
import trash from '../../../public/images/trash.svg';
import BtnWarning from '../btn/BtnWarning.jsx';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import style from './ConfirmRemovePopup.module.scss';
import ContainerPopup from './ContainerPopup.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';

function ConfirmRemovePopup({onRemove}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<Image src={trash} />
				<h3 className={style.title}>Are you sur to remove this set ?</h3>
				<div>
					<BtnWarning onClick={() => onRemove(true)}>Yes</BtnWarning>
					<BtnSecondary onClick={() => onRemove(false)}>
						No go back !
					</BtnSecondary>
				</div>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ConfirmRemovePopup;
