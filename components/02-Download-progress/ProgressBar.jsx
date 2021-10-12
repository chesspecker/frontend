import React from 'react';
import style from './ProgressBar.module.scss';

function ProgressBar({percentage}) {
	return (
		<div className={style.progress_bar_container}>
			<div className={style.progress_bar}>
				<div
					className={style.progress_bar_moving}
					style={{transform: `translateX(${percentage}%)`}}
				/>
			</div>
			<div
				className={style.progress_bar_dot_container}
				style={{transform: `translateX(${percentage}%) `}}
			>
				<div className={style.progress_bar_dot} />
			</div>
		</div>
	);
}

export default ProgressBar;
