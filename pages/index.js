import Head from 'next/head.js';
import LoginRegister from './login/index.jsx';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Chesspecker</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<LoginRegister />
		</div>
	);
}
