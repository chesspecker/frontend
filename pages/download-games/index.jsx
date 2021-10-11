import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary.jsx';
import OptionNumber from '../../components/01-Download-games/OptionNumber.jsx';
import style from './index.module.scss';
import Router from 'next/router';

function SetParameters(props) {
	const [toggleTimeGame, setToggleTimeGame] = useState(false);
	const [toggleTypeGame, setToggleTypeGame] = useState(false);
	const [gameTime, setGameTime] = useState([]);
	const [gameType, setGameType] = useState(null);
	const [gameNumber, setGameNumber] = useState();

	const handlToggleTimeChange = () => {
		setToggleTimeGame(toggleTymeGame => !toggleTymeGame);
		if (!toggleTimeGame) {
			const array = ['bullet', 'blitz', 'rapide', 'classical'];
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
			setGameType(() => {
				return null;
			});
		} else {
			setGameType(() => {
				return null;
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

		if (name === rated) {
			setGameType(() => {
				return true;
			});
		} else {
			setGameType(() => {
				return false;
			});
		}
	};

	const handleNumberChange = e => {
		console.log(e.target.value);
		setGameNumber(e.target.value);
	};

	const handleSubmit = () => {
		const linkParameters = new URLSearchParams({
			max: gameNumber,
			rated: gameType,
			perfType: gameTime.join(),
		});
		console.log(linkParameters);
		Router.push(`https://api.chesspecker.com/games/download?${linkParameters}`);
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
					Type de parties ?
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
					setName='blitz'
					onChange={handleAddGameTime}
				>
					Blitz
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='rapid'
					onChange={handleAddGameTime}
				>
					Rapide
				</OptionSecondary>
				<OptionSecondary
					setToggle={toggleTimeGame}
					setName='classical'
					onChange={handleAddGameTime}
				>
					Classique
				</OptionSecondary>
				<OptionToggle
					setName='type'
					setDescription='All'
					checked={toggleTypeGame}
					onChange={handlToggleTypeChange}
				>
					Classée, amicale ?
				</OptionToggle>
				<OptionSecondary
					setToggle={toggleTypeGame}
					setName='rated'
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
