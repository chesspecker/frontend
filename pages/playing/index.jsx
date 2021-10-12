import React from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import style from './index.module.scss';

function index(props) {
	const handleClick = () => {
		console.log('clicked');
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<div>
					<ChessGround />
				</div>
				<button className={style.btn} onClick={handleClick}>
					Test
				</button>
			</div>
		</PageHeader>
	);
}

export default index;
