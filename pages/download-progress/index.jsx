import React from 'react';

import PageHeader from '../../components/layouts/PageHeader.jsx';

import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import style from './index.module.scss';

function DownloadProgress(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>We are downloading your game 😀</h2>
				<p className={style.description}>Status : 240/500 games </p>
				<div className={style.progress_bar_container}>
					<div className={style.progress_bar}>
						<div
							className={style.progress_bar_moving}
							style={{transform: `translateX(10%)`}}
						/>
					</div>
					<div
						className={style.progress_bar_dot_container}
						style={{transform: `translateX(10%) `}}
					>
						<div className={style.progress_bar_dot} />
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default DownloadProgress;
