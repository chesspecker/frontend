import React from 'react';
import style from './Btn.module.scss';

function Btn({link, onClick, data, children}) {
	return (
		<a className={style.btn} href={link} onClick={onClick(data)}>
			{children}
		</a>
	);
}

export default Btn;
