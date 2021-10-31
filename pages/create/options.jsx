import {useState} from 'react';
import router from 'next/router.js';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import OptionTextInput from '../../components/layouts/form/OptionTextInput.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import {useNewSetContext} from '../../components/context/NewSetContext.jsx';
import http from '../../services/http-service.js';
import ErrorPopup from '../../components/layouts/popup/ErrorPopup.jsx';
import OptionSize from '../../components/layouts/form/OptionSize.jsx';
import OptionDifficulty from '../../components/layouts/form/OptionLevel.jsx';
import style from './options.module.scss';

function Options() {
	const api = process.env.API;
	const {newSet} = useNewSetContext();
	const [title, setTitle] = useState('');
	const [level, setLevel] = useState('normal');
	const [size, setSize] = useState(500);
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleError, setToggleError] = useState(false);

	const handleTitleChange = title => {
		setTitle(() => title.target.value);
	};

	const handleLevelChange = element => {
		setLevel(() => element.target.value);
	};

	const handleSizeChange = value => {
		setSize(() => value);
	};

	const handleSubmit = () => {
		http
			.post(
				`${api}/set`,
				{title, themeArray: newSet.themeArray, size, level},
				{withCredentials: true},
			)
			.then(() => {
				router.push('/dashboard');
			})
			.catch(error => console.error(error));
	};

	const validate = () => {
		if (isDisabled) return;
		if (title === '') {
			setToggleError(() => true);
			return;
		}

		setIsDisabled(() => true);
		handleSubmit();
	};

	const handleClickError = () => {
		setToggleError(() => false);
	};

	return (
		<>
			<Head>
				<title>Chesspecker - New set</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<PageHeader>
				{toggleError && <ErrorPopup onClick={handleClickError} />}
				<div className={style.container}>
					<h2 className={style.title}>One last thing...</h2>
					<div className={style.content}>
						<OptionTextInput
							name='title'
							value={title}
							onChange={handleTitleChange}
						>
							Give your set a name
						</OptionTextInput>

						<OptionDifficulty handleChange={handleLevelChange} />
						<OptionSize handleChange={handleSizeChange} />

						<div className={style.btn_container}>
							<Btn disabled={isDisabled} onClick={validate}>
								{isDisabled ? 'Loading...' : `LET'S GO! 🎉`}
							</Btn>
						</div>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Options;
