import Head from 'next/head.js';
import Link from 'next/link.js';
import Container from '../../components/layouts/Container.jsx';
import style from './index.module.css';

export default function LoginRegister() {
	console.log(process.env.API_KEY);
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
						<Link href={`http://${process.env.API}/auth/login`}>
							<a
								className={style.btn}
								href={`http://${process.env.API}/auth/login`}
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
