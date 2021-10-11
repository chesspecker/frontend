import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import Btn from '../../components/layouts/Btn';
import style from './index.module.scss';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary';

function SetParameters(props) {
	const [toggleTimeGame, setTogleTimeGame] = useState(false);
	const [toggleTypeGame, setTogleTypeGame] = useState(false);
	const [gameType, setGameType] = useState([]);

	const handlTimeChange = () => {
		console.log('selected');
		setTogleTimeGame(toggleTymeGame => !toggleTymeGame);
	};

	const handlTypeChange = () => {
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
				<OptionToggle
					setName='time'
					onChange={handlTimeChange}
					setDescription='All'
					setToggle={toggleTimeGame}
				>
					Durée des parties ? ⏲
				</OptionToggle>
				<OptionSecondary setToggle={toggleTimeGame} setName='Bullet'>
					Bullet
				</OptionSecondary>
				<OptionSecondary setToggle={toggleTimeGame} setName='Rapide'>
					Rapide
				</OptionSecondary>
				<OptionSecondary setToggle={toggleTimeGame} setName='Longues'>
					Longues
				</OptionSecondary>
				<OptionToggle
					setName='type'
					onChange={handlTypeChange}
					setDescription='All'
					setToggle={toggleTypeGame}
				>
					Type de partie ?
				</OptionToggle>
				<OptionSecondary setToggle={toggleTypeGame} setName='Classées'>
					Classée
				</OptionSecondary>
				<OptionSecondary setToggle={toggleTypeGame} setName='Amicale'>
					Amicale
				</OptionSecondary>

				<Btn>Download 🔥</Btn>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
