import Head from 'next/head.js';
import Options from '@/layouts/options/index.jsx';

export default function OptionsPage() {
	return (
		<>
			<Head>
				<title>Chesspecker - Options</title>
			</Head>
			<Options />
		</>
	);
}
