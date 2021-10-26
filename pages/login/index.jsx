import Head from 'next/head.js';
import Link from 'next/link.js';
import Container from '../../components/layouts/Container.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import style from './index.module.css';

export default function LoginRegister() {
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
						<Link href={`${process.env.API}/auth/login`}>
							<Btn link={`${process.env.API}/auth/login`}>SIGN IN 🧩</Btn>
						</Link>
					</div>
				</div>
			</Container>
		</>
	);
}
