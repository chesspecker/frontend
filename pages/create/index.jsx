import {useState} from 'react';
import Link from 'next/link.js';
import Head from 'next/head.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Choice from '../../components/03-Create-set/Choice.jsx';
import {
	puzzleThemes,
	themesCategory,
} from '../../services/game-categorie-service.js';
import Btn from '../../components/layouts/btn/Btn.jsx';
import {useNewSetContext} from '../../components/context/NewSetContext.jsx';
import ErrorPopupNewSet from '../../components/layouts/popup/ErrorPopupNewSet.jsx';
import ErrorPopupNumerousChoices from '../../components/layouts/popup/ErrorPopupNumerousChoices.jsx';
import style from './index.module.scss';

function NewSet() {
	const [choicesSelected, setChoicesSelected] = useState([]);
	const {updateNewSetOptions} = useNewSetContext();
	const [toggleHealthyMixPopup, setToggleHealthyMixPopup] = useState(false);
	const [toggleNumerousChoicesPopup, setToggleNumerousChoicesPopup] =
		useState(false);

	const handleClick = id => {
		const selectingHealthyMixWithOther =
			choicesSelected.length > 0 &&
			id === 'healthyMix' &&
			!choicesSelected.includes(id);
		const healthyMixAlreadySelected =
			choicesSelected[0] === 'healthyMix' && id !== 'healthyMix';
		const healthyMixError =
			selectingHealthyMixWithOther || healthyMixAlreadySelected;

		if (healthyMixError) {
			setToggleHealthyMixPopup(() => true);
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

		if (choicesSelected.length > 2) {
			setToggleNumerousChoicesPopup(() => true);
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
		<>
			<Head>
				<title>Chesspecker - Create</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<PageHeader>
				{toggleHealthyMixPopup && (
					<ErrorPopupNewSet
						onClick={() => setToggleHealthyMixPopup(() => false)}
					/>
				)}
				{toggleNumerousChoicesPopup && (
					<ErrorPopupNumerousChoices
						onClick={() => setToggleNumerousChoicesPopup(() => false)}
					/>
				)}
				<div className={style.container}>
					<h2 className={style.title}>
						{' '}
						Select one or more category to create your set!
					</h2>
					<div className={style.set_container}>
						{themesCategory.map(c => (
							<div className={style.set_category} key={c.id}>
								<h3 className={style.set_category_title}>{c.nom}</h3>
								<div className={style.set_category_choices}>
									{puzzleThemes
										.filter(p => p.category.nom === c.nom)
										.map(p => (
											<Choice
												key={p.id}
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
						<Link href='/create/options'>
							<Btn onClick={handleNextClick}>NEXT</Btn>
						</Link>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default NewSet;
