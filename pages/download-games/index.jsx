import {useState} from 'react';
import router from 'next/router.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import OptionToggle from '../../components/layouts/form/OptionToggle.jsx';
import OptionSecondary from '../../components/layouts/form/OptionSecondary.jsx';
import OptionNumber from '../../components/layouts/form/OptionNumber.jsx';
import http from '../../services/http-service.js';
import style from './index.module.scss';

function SetParameters() {
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

	const handleToggleTimeChange = () => {
		setToggleTimeGame(toggleTimeGame => !toggleTimeGame);
		if (toggleTimeGame) {
			setGameTime(() => []);
			setCheckBoxArrayTime(() => [false, false, false, false]);
		} else {
			setGameTime(() => ['bullet', 'blitz', 'rapide', 'classical']);
			setCheckBoxArrayTime(() => [true, true, true, true]);
		}
	};

	const handleToggleTypeChange = () => {
		setToggleTypeGame(toggleTypeGame => !toggleTypeGame);
		setGameType(() => null);
		toggleTypeGame
			? setCheckBoxArrayType(() => [false, false])
			: setCheckBoxArrayType(() => [true, true]);
	};

	const handleAddGameTime = (name, id) => {
		if (gameTime.includes(name)) {
			setGameTime(previousArray => {
				const array = [...previousArray];
				array.splice(gameTime.indexOf(name), 1);
				return array;
			});
		} else {
			setGameTime(previousArray => {
				const array = [...previousArray];
				array.push(name);
				return array;
			});
		}

		setCheckBoxArrayTime(previousArray => {
			const array = [...previousArray];
			array.splice(id, 1, !array[id]);
			if (array.every(item => item === true)) {
				setToggleTimeGame(toggleTimeGame => !toggleTimeGame);
			} else {
				setToggleTimeGame(() => false);
			}

			return array;
		});
	};

	const handleAddGameType = (name, id) => {
		name === 'rated' ? setGameType(() => true) : setGameType(() => false);
		setCheckBoxArrayType(previousArray => {
			const array = [...previousArray];
			array.splice(id, 1, !array[id]);
			if (array.every(item => item === true)) {
				setToggleTypeGame(toggleTypeGame => !toggleTypeGame);
			} else {
				setToggleTypeGame(() => false);
			}

			return array;
		});
	};

	const handleNumberChange = element => {
		setGameNumber(element.target.value);
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

		try {
			http.get(`${process.env.API}/games/download?${linkParameters}`, {
				withCredentials: true,
			});
			router.push('/download-progress');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					You have no game in the database yet! <br />
					Let&apos;s download some from Lichess 🔥
				</h2>
				<OptionNumber
					name='number_game'
					value={gameNumber}
					onChange={handleNumberChange}
				>
					How many games to download:
				</OptionNumber>
				<OptionToggle
					setName='time'
					setDescription='All'
					checked={toggleTimeGame}
					onChange={handleToggleTimeChange}
				>
					Type of game to import:
				</OptionToggle>
				import OptionToggle from '../../components/layouts/form/OptionsToggle';
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
					Classical
				</OptionSecondary>
				<OptionToggle
					setName='type'
					setDescription='All'
					checked={toggleTypeGame}
					onChange={handleToggleTypeChange}
				>
					Ranked or casual games ?
				</OptionToggle>
				<OptionSecondary
					id={0}
					setToggle={checkBoxArrayType[0]}
					setName='rated'
					onChange={handleAddGameType}
				>
					Ranked
				</OptionSecondary>
				<OptionSecondary
					id={1}
					setToggle={checkBoxArrayType[1]}
					setName='casual'
					onChange={handleAddGameType}
				>
					Casual
				</OptionSecondary>
				<Btn onClick={validate}>Download 🔥</Btn>
			</div>
		</PageHeader>
	);
}

export default SetParameters;
