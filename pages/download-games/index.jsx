import React, {useState} from 'react';
import Router from 'next/router.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary.jsx';
import OptionNumber from '../../components/01-Download-games/OptionNumber.jsx';
import style from './index.module.scss';
import http from '../../services/http-service';

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
				return array;
			});
		} else {
			const array = [];
			setGameTime(() => {
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
		if (gameTime.find(e => e === name)) {
			setGameTime(() => {
				const index = gameTime.indexOf(name);
				const array = [...gameTime];
				array.splice(index, 1);

				return array;
			});
		} else {
			setGameTime(() => {
				const array = [...gameTime];
				array.push(name);

				return array;
			});
		}
	};

	const handleAddGameType = name => {
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
		setGameNumber(e.target.value);
	};

	const validate = () => {
		if (gameNumber < 1) {
			alert('you must anayse at least one game ! ');
			return;
		}

		if (gameTime.length === 0) {
			alert('you must select at least one type of game !! ');
			return;
		}

		handleSubmit();
	};

	const handleSubmit = () => {
		const linkParameters = new URLSearchParams({
			max: gameNumber,
			rated: gameType,
			perfType: gameTime.join(','),
		});

		//	Router.push(`https://api.chesspecker.com/games/download?${linkParameters}`);
		try {
			http.get(`https://api.chesspecker.com/games/download?${linkParameters}`, {
				withCredentials: true,
			});
		} catch (er) {
			console.log(er);
			return;
		}
	};

	console.log('rerender');

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

				<Btn onClick={validate}>Download 🔥</Btn>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
