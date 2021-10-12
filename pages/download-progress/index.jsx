import React, {useEffect, useState} from 'react';
import http from '../../services/http-service.js';

import PageHeader from '../../components/layouts/PageHeader.jsx';

import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import style from './index.module.scss';

function DownloadProgress(props) {
	const api = process.env.API;
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		const getPercentage = async () => {
			const {data: percent} = await http.get(`${api}/worker`, {
				withCredentials: true,
			});
			console.log(percent);
		};

		setInterval(() => {
			getPercentage();
			console.log('getPercent');
		}, 5000);
	}, []);
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>We are downloading your game 😀</h2>
				<p className={style.description}>Status : 240/500 games </p>
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
			</div>
		</PageHeader>
	);
}

export default DownloadProgress;
