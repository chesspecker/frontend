import STYLE from './text-input.module.scss';

export default function OptionTextInput({onChange, setName, children, value}) {
	return (
		<div className={STYLE.option}>
			<label htmlFor='number_game' className={STYLE.option_description}>
				{children}
			</label>
			<input
				id={setName}
				className={STYLE.input_text}
				type='text'
				value={value}
				placeholder='ex: Road to 2300 elo :)'
				onChange={onChange}
			/>
		</div>
	);
}
