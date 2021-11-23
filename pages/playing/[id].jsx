import Head from 'next/head.js';
import Playing from '@/layouts/playing/index.jsx';
import http from '@/lib/http.js';

export default function PlayingPage({currentSetProps}) {
	return (
		<>
			<Head>
				<title>Chesspecker - Playing</title>
			</Head>
			<Playing currentSetProps={currentSetProps} />
		</>
	);
}

export async function getServerSideProps(context) {
	const api = process.env.API;
	const {id} = context.params;
	const options = {withCredentials: true};
	const response = await http.get(`${api}/set/id/${id}`, options);

	if (!response.data) return {notFound: true};
	return {props: {currentSetProps: response.data}};
}
