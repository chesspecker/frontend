import {useState} from 'react';
import Link from 'next/link.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Choice from '../../components/03-Create-set/Choice.jsx';
import {
	puzzleThemes,
	themesCategory,
} from '../../services/game-categorie-service.js';
import Btn from '../../components/layouts/btn/Btn.jsx';
import {useNewSetContext} from '../../components/context/NewSetContext.jsx';
import ErrorPopupNewSet from '../../components/layouts/popup/ErrorPopupNewSet.jsx';
import style from './index.module.scss';

function NewSet() {
	const [choicesSelected, setChoicesSelected] = useState([]);
	const {newSet, updateNewSetOptions} = useNewSetContext();
	const [toggleErrorPopup, setToggleErrorPopup] = useState(false);

	const handleClick = id => {
		console.log(id);
		if (
			(choicesSelected.length > 0 &&
				id === 'healthyMix' &&
				!choicesSelected.includes(id)) ||
			(choicesSelected[0] === 'healthyMix' && id !== 'healthyMix')
		) {
			setToggleErrorPopup(() => true);

			return;
		}

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

	const handleNextClick = () => {
		updateNewSetOptions(choicesSelected);
	};

	return (
		<PageHeader>
			{toggleErrorPopup && (
				<ErrorPopupNewSet onClick={() => setToggleErrorPopup(() => false)} />
			)}
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
											id={p.id}
											title={p.title}
											description={p.description}
											onClick={handleClick}
										/>
									))}
							</div>
						</div>
					))}
				</div>
				<div className={style.btn_container}>
					<Link href='/new-set/NameAndSize'>
						<Btn onClick={handleNextClick}>NEXT</Btn>
					</Link>
				</div>
			</div>
		</PageHeader>
	);
}

export default NewSet;
