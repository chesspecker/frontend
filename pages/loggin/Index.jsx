import React from 'react';
import Head from 'next/head.js';
import style from './Index.module.css';
import Container from '../../components/layouts/Container';

function LogginRegister(props) {
	return (
		<>
			<Head>
				<title>chesspecker</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container>
				<div className={style.container}>
					<div>
						<img className={style.imgLichess} src='./lichess.png' />
						<h1 className={style.title}>
							Happy to see you
							<br />
							newcomer 👋
						</h1>
					</div>
					<div className={style.contentBottom}>
						<a
							className={style.btn}
							href='https://api.chesspecker.com/auth/login'
						>
							SIGN IN WITH LICHESS
						</a>
					</div>
				</div>
			</Container>
		</>
	);
}

export default LogginRegister;
