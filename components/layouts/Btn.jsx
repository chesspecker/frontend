import React from 'react';
import style from './Btn.module.css';

function Btn({link, onClick, children}) {
	return (
		<a className={style.btn} href={link} onClick={onClick}>
			{children}
		</a>
	);
}

export default Btn;
