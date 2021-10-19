import React, {useState} from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Choice from '../../components/03-Create-set/Choice.jsx';
import {
	puzzleThemes,
	themesCategory,
} from '../../services/gameCategorieService.js';
import style from './index.module.scss';

function NewSet(props) {
	const [choicesSelected, setChoicesSelected] = useState([]);

	const handleClick = id => {
		if (choicesSelected.includes(id)) {
			setChoicesSelected(oldArray => {
				const index = oldArray.indexOf(id);
				const array = [...oldArray];
				array.splice(index, 1);
				return array;
			});
			return;
		}

		setChoicesSelected(oldArray => {
			const newArray = [...oldArray];
			newArray.push(id);
			return newArray;
		});
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					{' '}
					Select one or more category to create your set !
				</h2>
				<div className={style.set_container}>
					{themesCategory.map(c => (
						<div className={style.set_category}>
							<h3 className={style.set_category_title}>{c.nom}</h3>
							<div className={style.set_category_choices}>
								{puzzleThemes
									.filter(p => p.category.nom === c.nom)
									.map(p => (
										<Choice
											selected={choicesSelected}
											id={p.title}
											title={p.title}
											description='bonsoir paris'
											onClick={handleClick}
										/>
									))}
							</div>
						</div>
					))}
				</div>
			</div>
		</PageHeader>
	);
}

export default NewSet;
