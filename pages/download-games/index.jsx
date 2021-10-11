import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import ToggleSwitch from '../../components/layouts/ToggleSwitch.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary.jsx';
import style from './index.module.scss';
import {array} from 'prop-types';

function SetParameters(props) {
	const [toggleTimeGame, setTogleTimeGame] = useState(false);
	const [toggleTypeGame, setTogleTypeGame] = useState(false);
	const [gameType, setGameType] = useState([]);

	const handlToggleTimeChange = game => {
		console.log('game =', game);
		setTogleTimeGame(toggleTymeGame => !toggleTymeGame);
	};

	const handlToggleTypeChange = () => {
		console.log('selected');
		setTogleTypeGame(toggleTypeGame => !toggleTypeGame);
	};

	const handleAddGame = name => {
		const actualArray = [...gameType];

		if (gameType.find(e => e === name)) {
			setGameType(() => {
				const index = gameType.findIndex(e => e === name);
				const array = [...gameType];
				array.splice(index, 1);
				console.log('game', array);

				return array;
			});
		} else {
			setGameType(() => {
				const array = [...gameType];
				array.push(name);
				console.log('game', array);
				return array;
			});
		}
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
					setDescription='All'
					setToggle={toggleTimeGame}
					onChange={handlToggleTimeChange}
				>
					Durée des parties ? ⏲
				</OptionToggle>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='bullet'
					onChange={handleAddGame}
				>
					Bullet
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='rapide'
					onChange={handleAddGame}
				>
					Rapide
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='longues'
					onChange={handleAddGame}
				>
					Longues
				</OptionSecondary>
				<OptionToggle
					setName='type'
					setDescription='All'
					setToggle={toggleTypeGame}
					onChange={handlToggleTypeChange}
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
