import React from 'react';
import Head from 'next/head.js';
import style from './Index.module.css';

function LogginRegister(props) {
	return (
		<div className={style.container}>
			<Head>
				<title>chesspecker</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<img className={style.imgLichess} src='./lichess.png' />
				<h1 className={style.title}>
					Happy to see you
					<br />
					newcomer 👋
				</h1>
			</div>
			<div className={style.contentBottom}>
				<a className={style.btn} href='https://api.chesspecker.com/auth/login'>
					SIGN IN WITH LICHESS
				</a>
			</div>
		</div>
	);
}

export default LogginRegister;
