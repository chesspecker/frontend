import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import Link from 'next/link.js';
import http from '../../services/http-service.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ProgressBar from '../../components/02-Download-progress/ProgressBar.jsx';
import style from './index.module.scss';

const ENDPOINT = 'https://api.chesspecker.com';

function AnalyseProgress() {
	const api = process.env.API;
	const [percentage, setPercentage] = useState(0);
	const [, setProgress] = useState(0);
	const [count, setCount] = useState(0);
	const [max, setMax] = useState(0);

	useEffect(() => {
		const socket = io(ENDPOINT, {
			transports: ['websocket', 'polling'],
			credentials: true,
		});
		socket.on('connect', () => {
			console.log(`connected with id: ${socket.id}`);
		});
		socket.on('FromAPI', data => {
			setPercentage(100 * data.progress);
			setCount(data.count);
			setMax(data.max);
		});
	}, []);

	useEffect(() => {
		const getProgress = async () => {
			const {data} = await http.get(`${api}/worker`, {
				withCredentials: true,
			});
			setProgress(() => data.jobProgress);
		};

		setInterval(() => {
			getProgress();
		}, 500);
	}, [api]);

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					Ok, now let&apos;s analyse your game !! 🔥
				</h2>
				<p className={style.description}>
					Status : {count}/{max} games{' '}
				</p>
				<p className={style.percentage}>{percentage} %</p>
				<ProgressBar percentage={percentage} />
				<p className={style.noWorries}>
					No worries, you can close this page and come back later
				</p>
				<Link href='/playing'>
					<button>Next page</button>
				</Link>
			</div>
		</PageHeader>
	);
}

export default AnalyseProgress;
