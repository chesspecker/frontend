import React from 'react';
import style from './BackgroundPopup.module.scss';

function BackgroundPopup({children}) {
	return <div className={style.popup}>{children}</div>;
}

export default BackgroundPopup;
