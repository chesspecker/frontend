import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary.jsx';
import style from './index.module.scss';
import OptionNumber from '../../components/01-Download-games/OptionNumber.jsx';

function SetParameters(props) {
	const [toggleTimeGame, setToggleTimeGame] = useState(false);
	const [toggleTypeGame, setToggleTypeGame] = useState(false);
	const [gameTime, setGameTime] = useState([]);
	const [gameType, setGameType] = useState([]);
	const [gameNumber, setGameNumber] = useState();

	const handlToggleTimeChange = () => {
		setToggleTimeGame(toggleTymeGame => !toggleTymeGame);
		if (!toggleTimeGame) {
			const array = ['bullet', 'rapide', 'longue'];
			setGameTime(() => {
				console.log(array);
				return array;
			});
		} else {
			const array = [];
			setGameTime(() => {
				console.log(array);
				return array;
			});
		}
	};

	const handlToggleTypeChange = () => {
		setToggleTypeGame(() => !toggleTypeGame);
		if (!toggleTypeGame) {
			const array = ['classées', 'amicale'];
			setGameType(() => {
				console.log(array);
				return array;
			});
		} else {
			const array = [];
			setGameType(() => {
				console.log(array);
				return array;
			});
		}
	};

	const handleAddGameTime = name => {
		if (name === 'time') console.log('in the time fonction');

		if (gameTime.find(e => e === name)) {
			setGameTime(() => {
				const index = gameTime.indexOf(name);
				const array = [...gameTime];
				array.splice(index, 1);
				console.log('game', array);

				return array;
			});
		} else {
			setGameTime(() => {
				const array = [...gameTime];
				array.push(name);
				console.log('game', array);
				return array;
			});
		}
	};

	const handleAddGameType = name => {
		console.log(name);
		if (name === 'type') console.log('in the type fonction');

		if (gameType.find(e => e === name)) {
			setGameType(() => {
				const index = gameType.indexOf(name);
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

	const handleNumberChange = e => {
		console.log(e.target.value);
		setGameNumber(e.target.value);
	};

	const handleSubmit = () => {
		const linkParameters = new URLSearchParams({
			max: 150,
			rated: true,
			perfType: 'classical',
			pgnInJson: true,
		});
		console.log(linkParameters);
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					You have no games in the database, download games from litchess
				</h2>
				<OptionNumber
					name='number_game'
					value={gameNumber}
					onChange={handleNumberChange}
				>
					Nombre de partie à analyser ?
				</OptionNumber>
				<OptionToggle
					setName='time'
					setDescription='All'
					checked={toggleTimeGame}
					onChange={handlToggleTimeChange}
				>
					Durée des parties ? ⏲
				</OptionToggle>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='bullet'
					onChange={handleAddGameTime}
				>
					Bullet
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='rapide'
					onChange={handleAddGameTime}
				>
					Rapide
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='longues'
					onChange={handleAddGameTime}
				>
					Longues
				</OptionSecondary>
				<OptionToggle
					setName='type'
					setDescription='All'
					checked={toggleTypeGame}
					onChange={handlToggleTypeChange}
				>
					Type de partie ?
				</OptionToggle>
				<OptionSecondary
					setToggle={toggleTypeGame}
					setName='classées'
					onChange={handleAddGameType}
				>
					Classée
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTypeGame}
					setName='amicale'
					onChange={handleAddGameType}
				>
					Amicale
				</OptionSecondary>

				<Btn onClick={handleSubmit}>Download 🔥</Btn>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
