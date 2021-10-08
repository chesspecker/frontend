import React from 'react';
import Head from 'next/head.js';
import NavBar from '../../components/NavBar.jsx';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import style from './index.module.css';

function Index() {
	return (
		<>
			<Head>
				<title>chesspecker-sucess</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageHeader>
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
			</PageHeader>
		</>
	);
}

export default Index;
