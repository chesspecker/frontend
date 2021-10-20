import React from 'react';
import style from './OptionTextInput.module.scss';

function OptionTextInput({onChange, setName, children, value}) {
	return (
		<div className={style.option}>
			<label htmlFor='number_game' className={style.option_description}>
				{children}
			</label>
			<input
				id={setName}
				className={style.input_text}
				type='text'
				value={value}
				placeholder='ex : Road to 2300 elo :)'
				onChange={onChange}
			/>
		</div>
	);
}

export default OptionTextInput;
