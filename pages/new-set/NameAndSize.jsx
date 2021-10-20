import React, {useState} from 'react';
import Link from 'next/link.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import OptionNumber from '../../components/layouts/form/OptionNumber.jsx';
import OptionTextInput from '../../components/layouts/form/OptionTextInput.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import {useNewSetContext} from '../../components/context/NewSetContext.jsx';
import usePostNewSet from '../../components/hooks/usePostNewSet.jsx';
import http from '../../services/http-service.js';
import style from './NameAndSize.module.scss';

function NameAndSize(props) {
	const [title, setTitle] = useState('');
	const [size, setSize] = useState(0);
	const {newSet, updateNewSetSize, updateNewSetTitle} = useNewSetContext();
	const api = process.env.API;
	console.log('newSet in NameAndSize', newSet);

	const handleSizeChange = size => {
		setSize(() => {
			return size.target.value;
		});
	};

	const handleTitleChange = title => {
		setTitle(() => {
			return title.target.value;
		});
	};

	const handleSubmit = async () => {
		updateNewSetSize(size);
		updateNewSetTitle(title);
		// UsePostNewSet({title: title, themeArray: newSet.themeArray, size: size});
		await http.post(
			`${api}/puzzles/sets`,
			{title, themeArray: newSet.themeArray, size},
			{
				withCredentials: true,
			},
		);
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>On last thing</h2>
				<div className={style.content}>
					<OptionTextInput
						name='title'
						value={title}
						onChange={handleTitleChange}
					>
						Give your set a Name
					</OptionTextInput>
					<OptionNumber
						name='number_game'
						value={size}
						onChange={handleSizeChange}
					>
						How many game for your set ?
					</OptionNumber>
					<div className={style.btn_container}>
						<Link href='/dashboard'>
							<Btn onClick={handleSubmit}>Let's go ! 🎉</Btn>
						</Link>
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default NameAndSize;
