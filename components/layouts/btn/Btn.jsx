import React from 'react';
import style from './Btn.module.scss';

function Btn({link, onClick, children}) {
	return (
		<a className={style.btn} onClick={onClick(link)}>
			{children}
		</a>
	);
}

export default Btn;
