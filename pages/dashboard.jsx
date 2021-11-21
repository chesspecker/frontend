import Head from 'next/head.js';
import Dashboard from '@/layouts/dashboard/index.jsx';

export default function DashboardPage() {
	return (
		<>
			<Head>
				<title>Chesspecker - Dashboard</title>
			</Head>
			<Dashboard />
		</>
	);
}
