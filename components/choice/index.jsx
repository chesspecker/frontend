import STYLE from './index.module.scss';

function Choice({onClick, selected, id, title, description}) {
	const setActiveTitle = () =>
		selected.includes(id) ? `${STYLE.title_active}` : `${STYLE.title}`;

	const setActiveDesc = () =>
		selected.includes(id) ? `${STYLE.desc_active}` : `${STYLE.desc}`;

	const setActiveChoice = () =>
		selected.includes(id) ? `${STYLE.choice_active}` : `${STYLE.choice}`;

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
