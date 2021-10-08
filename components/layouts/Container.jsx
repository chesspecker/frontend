import React from 'react';
import style from './Container.module.css';

function Container({children}) {
	return <div className={style.container}>{children}</div>;
}

export default Container;
