import React, {useState} from 'react';
import Router from 'next/router.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import OptionToggle from '../../components/01-Download-games/OptionsToggle.jsx';
import OptionSecondary from '../../components/01-Download-games/OptionSecondary.jsx';
import OptionNumber from '../../components/01-Download-games/OptionNumber.jsx';
import http from '../../services/http-service.js';
import style from './index.module.scss';

function SetParameters(props) {
	const [toggleTimeGame, setToggleTimeGame] = useState(false);
	const [toggleTypeGame, setToggleTypeGame] = useState(false);
	const [gameTime, setGameTime] = useState([]);
	const [gameType, setGameType] = useState(null);
	const [gameNumber, setGameNumber] = useState();
	const [checkBoxArrayTime, setCheckBoxArrayTime] = useState([
		false,
		false,
		false,
		false,
	]);
	const [checkBoxArrayType, setCheckBoxArrayType] = useState([false, false]);

	const handlToggleTimeChange = () => {
		setToggleTimeGame(toggleTymeGame => !toggleTymeGame);
		if (!toggleTimeGame) {
			const array = ['bullet', 'blitz', 'rapide', 'classical'];
			setGameTime(() => {
				return array;
			});
			setCheckBoxArrayTime(() => [true, true, true, true]);
		} else {
			const array = [];
			setGameTime(() => {
				return array;
			});
			setCheckBoxArrayTime(() => [false, false, false, false]);
		}
	};

	const handlToggleTypeChange = () => {
		setToggleTypeGame(() => !toggleTypeGame);
		if (!toggleTypeGame) {
			setGameType(() => {
				return null;
			});
			setCheckBoxArrayType(() => [true, true]);
		} else {
			setGameType(() => {
				return null;
			});
			setCheckBoxArrayType(() => [false, false]);
		}
	};

	const handleAddGameTime = (name, id) => {
		if (gameTime.find(e => e === name)) {
			setGameTime(() => {
				const index = gameTime.indexOf(name);
				const array = [...gameTime];
				array.splice(index, 1);

				return array;
			});
			setCheckBoxArrayTime(e => {
				const array = [...checkBoxArrayTime];
				if (array.every(e => e === true)) {
					setToggleTimeGame(() => !toggleTimeGame);
				}

				array.splice(id, 1, false);

				return array;
			});
		} else {
			setGameTime(() => {
				const array = [...gameTime];
				array.push(name);

				return array;
			});
			setCheckBoxArrayTime(e => {
				const array = [...checkBoxArrayTime];
				array.splice(id, 1, true);
				if (array.every(e => e === true)) {
					setToggleTimeGame(() => !toggleTimeGame);
				}

				return array;
			});
		}
	};

	const handleAddGameType = (name, id) => {
		if (name === 'rated') {
			console.log('in the function');
			setGameType(() => {
				return true;
			});
			setCheckBoxArrayType(e => {
				const array = [...checkBoxArrayType];
				if (array.every(e => e === true)) {
					setToggleTypeGame(() => !toggleTypeGame);
				}

				if (array[id]) {
					array.splice(id, 1, false);
				} else {
					array.splice(id, 1, true);
				}

				console.log(array);

				return array;
			});
		} else {
			setGameType(() => {
				return false;
			});
			setCheckBoxArrayType(e => {
				const array = [...checkBoxArrayType];
				if (array.every(e => e === true)) {
					setToggleTypeGame(() => !toggleTypeGame);
				}

				if (array[id]) {
					array.splice(id, 1, false);
				} else {
					array.splice(id, 1, true);
				}
				console.log(array);

				return array;
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
		} catch (error) {
			console.log(error);
		}
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
					id={0}
					setToggle={checkBoxArrayTime[0]}
					setName='bullet'
					onChange={handleAddGameTime}
				>
					Bullet
				</OptionSecondary>
				<OptionSecondary
					id={1}
					setToggle={checkBoxArrayTime[1]}
					setName='blitz'
					onChange={handleAddGameTime}
				>
					Blitz
				</OptionSecondary>
				<OptionSecondary
					id={2}
					setToggle={checkBoxArrayTime[2]}
					setName='rapid'
					onChange={handleAddGameTime}
				>
					Rapide
				</OptionSecondary>
				<OptionSecondary
					id={3}
					setToggle={checkBoxArrayTime[3]}
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
					id={0}
					setToggle={checkBoxArrayType[0]}
					setName='rated'
					onChange={handleAddGameType}
				>
					Classée
				</OptionSecondary>
				<OptionSecondary
					id={1}
					setToggle={checkBoxArrayType[1]}
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
