import React from 'react';
import Head from 'next/head.js';
import Link from 'next/link.js';
import Container from '../../components/layouts/Container.jsx';
import style from './index.module.css';

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
						<Link href='/sucess-loggin'>
							<a
								className={style.btn}
								href='#'
								// href='https://api.chesspecker.com/auth/login'
							>
								SIGN IN WITH LICHESS
							</a>
						</Link>
					</div>
				</div>
			</Container>
		</>
	);
}

export default LogginRegister;
