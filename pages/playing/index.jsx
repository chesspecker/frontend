import React from 'react';
import dynamic from 'next/dynamic.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import style from './index.module.scss';

const Chessground = dynamic(
	() => import('../../components/layouts/ChessGround.jsx'),
	{ssr: false},
);

function index(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<Chessground />
			</div>
		</PageHeader>
	);
}

export default index;
