import Head from 'next/head.js';
import Login from '@/layouts/login/index.jsx';

export default function IndexPage() {
	return (
		<>
			<Head>
				<title>Chesspecker</title>
			</Head>
			<Login />
		</>
	);
}
