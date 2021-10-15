import {useEffect, useState} from 'react';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import http from '../../services/http-service.js';
import Btn from '../../components/layouts/btn/Btn.jsx';
import style from './index.module.css';

function Index() {
	const [username, setUsername] = useState('');
	const api = process.env.API;

	useEffect(() => {
		const getUser = async () => {
			const {data: user} = await http.get(`${api}/user`, {
				withCredentials: true,
			});
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
						<Btn link='/download-games'>LET&apos;S GO !</Btn>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Index;
