import {useState} from 'react';
import Link from 'next/link.js';
import Router from 'next/router.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import OptionNumber from '../../components/layouts/form/OptionNumber.jsx';
import OptionTextInput from '../../components/layouts/form/OptionTextInput.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import {useNewSetContext} from '../../components/context/NewSetContext.jsx';
import http from '../../services/http-service.js';
import ErrorPopup from '../../components/layouts/popup/ErrorPopup.jsx';
import OptionSize from '../../components/layouts/form/OptionSize.jsx';
import style from './NameAndSize.module.scss';

function NameAndSize() {
	const [title, setTitle] = useState('');
	const [size, setSize] = useState(0);
	const [difficulty, setDifficulty] = useState('easy');
	const [toggleError, setToggleError] = useState(false);
	const {newSet, updateNewSetSize, updateNewSetTitle} = useNewSetContext();
	const api = process.env.API;

	const handleSizeChange = size => {
		setSize(() => size.target.value);
	};

	const handleTitleChange = title => {
		setTitle(() => title.target.value);
	};

	const handleDifficultyChange = dif => {
		setDifficulty(() => dif.target.value);
	};

	const handleSubmit = () => {
		updateNewSetSize(size);
		updateNewSetTitle(title);
		console.log(difficulty);
		http
			.post(
				`${api}/puzzles/sets`,
				{title, themeArray: newSet.themeArray, size, level: difficulty},
				{withCredentials: true},
			)
			.then(value => {
				console.log(value);
				Router.push('/dashboard');
			});
	};

	const validate = () => {
		if (size < 20 || size > 40) {
			setToggleError(() => true);
			setSize(() => 0);
			return;
		}

		handleSubmit();
	};

	const handleClickError = () => {
		setToggleError(() => false);
	};

	return (
		<PageHeader>
			{toggleError && <ErrorPopup onClick={handleClickError} />}
			<div className={style.container}>
				<h2 className={style.title}>On last thing</h2>
				<div className={style.content}>
					<OptionTextInput
						name='title'
						value={title}
						onChange={handleTitleChange}
					>
						Give your set a name
					</OptionTextInput>
					<OptionNumber
						name='number_game'
						value={size}
						onChange={handleSizeChange}
					>
						How many puzzle in this set ? (20-40)
					</OptionNumber>
					<OptionSize checked={difficulty} onChange={handleDifficultyChange}>
						Difficulty
					</OptionSize>
					<div className={style.btn_container}>
						<Btn onClick={validate}>Let&apos;s go ! 🎉</Btn>
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default NameAndSize;
