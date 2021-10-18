import React from 'react';
import PageHeader from '../../components/layouts/PageHeader';
import style from './index.module.scss';
import GameSet from '../../components/layouts/sets/GameSet';
function Dashboard(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<div className={style.gameSet}>
					<GameSet />
				</div>
			</div>
		</PageHeader>
	);
}

export default Dashboard;
