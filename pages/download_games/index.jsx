import React from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import style from './index.module.css';

function SetParameters(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					You have no games in the database, download games from litchess
				</h2>

				<div className={style.option}>
					<label htmlFor='number_game' className={style.description}>
						Nombre de partie à analyser ?{' '}
					</label>
					<input
						id='number_game'
						className={style.input_number}
						type='number'
						placeholder='ex:150'
					/>
				</div>
				<div className={style.option}>
					<p htmlFor='number_game' className={style.description}>
						Type de parties ?
					</p>
					<ToggleSwitch name='test' />
				</div>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
