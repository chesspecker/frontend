import Head from 'next/head.js';
import PageNotFound from './404/404.jsx';

export default function Custom404() {
	return (
		<div>
			<Head>
				<title>Chesspecker - 404</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<PageNotFound />
		</div>
	);
}
