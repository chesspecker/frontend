import {useState} from 'react';
import Router from 'next/router.js';
import STYLE from './index.module.scss';
import {useNewSetContext} from '@/context/new-set-context.jsx';
import Container from '@/layouts/container/index.jsx';
import CATEGORIES from '@/data/categories.js';
import THEMES from '@/data/themes.js';
import Button from '@/components/button/index.jsx';
import Choice from '@/components/choice/index.jsx';
import ErrorPopupNewSet from '@/components/popup/error-new-set.jsx';
import ErrorPopupNumerousChoices from '@/components/popup/error-numerous-choices.jsx';

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
		if (choicesSelected.length === 0) setChoicesSelected(() => ['healthyMix']);
		updateNewSetOptions([...choicesSelected]);
		Router.push('/options');
	};

	return (
		<Container>
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
			<div className={STYLE.container}>
				<h2 className={STYLE.title}>
					{' '}
					Select one or more category to create your set!
				</h2>
				<div className={STYLE.set_container}>
					{CATEGORIES.map(c => (
						<div key={c.id} className={STYLE.set_category}>
							<h3 className={STYLE.set_category_title}>{c.name}</h3>
							<div className={STYLE.set_category_choices}>
								{THEMES.filter(p => p.category.name === c.name).map(p => (
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
				<div className={STYLE.btn_container}>
					<Button onClick={handleNextClick}>NEXT</Button>
				</div>
			</div>
		</Container>
	);
}

export default NewSet;
