import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import GameMap from './GameMap.jsx';

function Dashboard() {
	return (
		<>
			<Head>
				<title>Chesspecker - Dashboard</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<PageHeader>
				<GameMap />
			</PageHeader>
		</>
	);
}

export default Dashboard;
