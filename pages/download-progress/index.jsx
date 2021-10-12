import React, {useEffect, useState} from 'react';
import http from '../../services/http-service.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ProgressBar from '../../components/02-Download-progress/ProgressBar.jsx';
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
			setPercentage(() => percent);
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
				<ProgressBar percentage={percentage} />
			</div>
		</PageHeader>
	);
}

export default DownloadProgress;
