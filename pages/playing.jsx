import Head from 'next/head.js';
import Playing from '@/layouts/playing/index.jsx';

export default function PlayingPage() {
	return (
		<>
			<Head>
				<title>Chesspecker - Playing</title>
			</Head>
			<Playing />
		</>
	);
}
