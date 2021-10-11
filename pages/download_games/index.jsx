import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import style from './index.module.scss';

function SetParameters(props) {
	const [toggleTypeGame, setTogleTypeGame] = useState(false);

	const handlChange = () => {
		console.log('selected');
		setTogleTypeGame(toggleTypeGame => !toggleTypeGame);
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					You have no games in the database, download games from litchess
				</h2>

				<div className={style.option}>
					<label htmlFor='number_game' className={style.option_description}>
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
					<p htmlFor='number_game' className={style.option_description}>
						Type de parties ?
					</p>
					<ToggleSwitch
						name='test'
						checked={toggleTypeGame}
						onChange={handlChange}
					/>
				</div>

				<div
					className={`${style.option} ${style.option_secondary}`}
					style={toggleTypeGame ? {display: 'none'} : {display: 'flex'}}
				>
					<p htmlFor='number_game' className={style.option_description}>
						Bullet
					</p>
					<ToggleSwitch name='bullet' />
				</div>
				<div
					className={`${style.option} ${style.option_secondary}`}
					style={toggleTypeGame ? {display: 'none'} : {display: 'flex'}}
				>
					<p htmlFor='number_game' className={style.option_description}>
						Rapide
					</p>
					<ToggleSwitch name='rapide' />
				</div>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
