import React, {useEffect, useState} from 'react';
import Head from 'next/head.js';
import Page_header from '../../components/layouts/Page_header.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import style from './index.module.css';
import http from '../../services/http-service.js';

function Index(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const logUser = async () => {
			const {data: response} = await http.get(
				'https://api.chesspecker.com/auth/login',
			);
			setItems(response);
		};

		logUser();
	}, []);

	return (
		<>
			<Head>
				<title>chesspecker-sucess</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Page_header>
				{useConffeti()}
				<div className={style.container}>
					<div>
						<h1 className={style.title}>
							Hello
							<br />
							newcomer 👋 <br /> Welcome to ChessPecker
						</h1>
					</div>
				</div>
			</Page_header>
		</>
	);
}

export default Index;
