import style from './Choice.module.scss';

function Choice({onClick, selected, id, title, description}) {
	const setActiveTitle = () => {
		if (selected.includes(id)) return `${style.title_active}`;
		return `${style.title}`;
	};

	const setActiveDesc = () => {
		if (selected.includes(id)) return `${style.description_active}`;
		return `${style.description}`;
	};

	const setActiveChoice = () => {
		if (selected.includes(id)) return `${style.choice_active}`;
		return `${style.choice}`;
	};

	return (
		<div
			className={setActiveChoice()}
			selected={selected}
			onClick={() => onClick(id)}
		>
			<h4 className={setActiveTitle()}>{title}</h4>
			<p className={setActiveDesc()}>{description}</p>
		</div>
	);
}

export default Choice;
