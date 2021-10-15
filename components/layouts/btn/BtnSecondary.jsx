import React from 'react';
import style from './Btn.module.scss';

function BtnSecondary({children}) {
	return <button className={style.btn_secondary}>{children}</button>;
}

export default BtnSecondary;
