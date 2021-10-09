import React, {useEffect, useState} from 'react';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import http from '../../services/http-service.js';
import style from './index.module.css';

function Index() {
	const [user, setUser] = useState('');

	useEffect(() => {
		const getUserName = async () => {
			const response = await fetch('https://api.chesspecker.com/user', {
				credentials: 'include',
			});
			const data = await response.json();
			console.log(data);
		};
		getUserName();
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
							Hello {user}
							<br />
							newcomer 👋 <br /> Welcome to ChessPecker
						</h1>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Index;
