import React from 'react';
import NavBar from '../../components/NavBar';
import Head from 'next/head';
import Container from '../../components/layouts/Container';
import style from './index.module.css';
import useConffeti from '../../components/hooks/useConffeti';

function Index(props) {
	return (
		<>
			<Head>
				<title>chesspecker-sucess</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{useConffeti()}
			<Container>
				<NavBar />
				<div className={style.container}>
					<div>
						<h1 className={style.title}>
							Hello
							<br />
							newcomer 👋 <br /> Welcome to ChessPecker
						</h1>
					</div>
				</div>
			</Container>
		</>
	);
}

export default Index;
