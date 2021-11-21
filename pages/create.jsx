import Head from 'next/head.js';
import Create from '@/layouts/create/index.jsx';

export default function CreatePage() {
	return (
		<>
			<Head>
				<title>Chesspecker - Create</title>
			</Head>
			<Create />
		</>
	);
}
