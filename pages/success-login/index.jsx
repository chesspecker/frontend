import {useEffect, useState} from 'react';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import useUser from '../../components/hooks/useUser.jsx';
import style from './index.module.css';

function Index() {
	const user = useUser();
	const [username, setUsername] = useState('');
	useEffect(() => setUsername(() => user.name));

	return (
		<>
			<Head>
				<title>chesspecker-success</title>
				<meta name='description' content='chesspecker training app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<PageHeader>
				{useConffeti()}
				<div className={style.container}>
					<div>
						<h1 className={style.title}>
							Hello {username}👋 <br /> Welcome to ChessPecker
						</h1>
						<Btn link='/dashboard'>LET&apos;S GO !</Btn>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Index;
