import {useState} from 'react';
import Router from 'next/router.js';
import STYLE from './index.module.scss';
import {useNewSetContext} from '@/context/new-set-context.jsx';
import http from '@/lib/http.js';
import Container from '@/layouts/container/index.jsx';

import OptionTextInput from '@/components/option/text-input.jsx';
import OptionSize from '@/components/option/size.jsx';
import OptionDifficulty from '@/components/option/level.jsx';

import Button from '@/components/button/index.jsx';
import ErrorPopup from '@/components/popup/error.jsx';

function Options() {
	const api = process.env.API;
	const {newSet} = useNewSetContext();
	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleError, setToggleError] = useState(false);

	const [title, setTitle] = useState('');
	const handleTitleChange = title => setTitle(() => title.target.value);

	const [level, setLevel] = useState('normal');
	const handleLevelChange = element => setLevel(() => element.target.value);

	const [size, setSize] = useState(500);
	const handleSizeChange = value => setSize(() => value);

	const handleSubmit = () => {
		http
			.post(
				`${api}/set`,
				{title, themeArray: newSet.themeArray, size, level},
				{withCredentials: true},
			)
			.then(() => {
				Router.push('/dashboard');
			})
			.catch(error => console.error(error));
	};

	const validate = () => {
		if (isDisabled) return;
		if (title === '') return setToggleError(() => true);
		setIsDisabled(() => true);
		handleSubmit();
	};

	const handleClickError = () => setToggleError(() => false);

	return (
		<Container>
			{toggleError && <ErrorPopup onClick={handleClickError} />}
			<div className={STYLE.container}>
				<h2 className={STYLE.title}>One last thing...</h2>
				<div className={STYLE.content}>
					<OptionTextInput
						name='title'
						value={title}
						onChange={handleTitleChange}
					>
						Give your set a name
					</OptionTextInput>

					<OptionDifficulty handleChange={handleLevelChange} />
					<OptionSize handleChange={handleSizeChange} />

					<div className={STYLE.btn_container}>
						<Button disabled={isDisabled} onClick={validate}>
							{isDisabled ? 'Loading...' : `LET'S GO! 🎉`}
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Options;
