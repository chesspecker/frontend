import React from 'react';
import style from './Btn.module.css';

function Btn({link, children}) {
	return (
		<a className={style.btn} href={link}>
			{children}
		</a>
	);
}

export default Btn;
