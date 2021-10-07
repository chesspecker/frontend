import Head from 'next/head.js';
import styles from '../styles/main.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>chesspecker</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>
				<img className={styles.imgLichess} src='./lichess.png' />
				<h1 className={styles.title}>
					Happy to see you
					<br />
					newcomer 👋
				</h1>
			</div>
			<div className={styles.contentBottom}>
				<a className={styles.btn} href='https://api.chesspecker.com/auth/login'>
					SIGN IN WITH LICHESS
				</a>
			</div>
		</div>
	);
}
