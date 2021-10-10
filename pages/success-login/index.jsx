import {useEffect, useState} from 'react';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import http from '../../services/http-service.js';
import style from './index.module.css';

function Index() {
	const [username, setUsername] = useState('');

	useEffect(() => {
		const getUser = async () => {
			const {data: user} = await http.get('https://api.chesspecker.com/user', {
				withCredentials: true,
			});
			console.log(user);
			setUsername(user.name);
		};

		getUser();
	}, []);

	return (
		<>
			<Head>
				<title>chesspecker-success</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageHeader>
				{useConffeti()}
				<div className={style.container}>
					<div>
						<h1 className={style.title}>
							Hello {username}👋 <br /> Welcome to ChessPecker
						</h1>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Index;
