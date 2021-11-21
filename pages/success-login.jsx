import Head from 'next/head.js';
import SuccessLogin from '@/layouts/success-login/index.jsx';

export default function SuccessLoginPage() {
	return (
		<>
			<Head>
				<title>Chesspecker - Success Login</title>
			</Head>
			<SuccessLogin />
		</>
	);
}
