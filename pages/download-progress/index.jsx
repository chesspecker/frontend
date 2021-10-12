import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';
import http from '../../services/http-service.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ProgressBar from '../../components/02-Download-progress/ProgressBar.jsx';
import style from './index.module.scss';

const ENDPOINT = 'https://api.chesspecker.com';

function DownloadProgress(props) {
	const api = process.env.API;
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT, {
			transports: ['websocket', 'polling'],
			credentials: true,
		});
		socket.on('connect', () => {
			console.log(socket.id);
		});
		socket.on('FromAPI', data => {
			console.log(data);
			setPercentage(data * 100);
		});
	}, []);
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>We are downloading your game 😀</h2>
				<p className={style.description}>Status : 240/500 games </p>
				<p className={style.percentage}>{percentage} %</p>
				<ProgressBar percentage={percentage} />
				<p className={style.noWorries}>
					No worries, you can close this page and come back later
				</p>
			</div>
		</PageHeader>
	);
}

export default DownloadProgress;
