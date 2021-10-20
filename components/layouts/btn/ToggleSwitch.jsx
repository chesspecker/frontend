import React from 'react';
import style from './ToggleSwitch.module.scss';

function ToggleSwitch({name, onChange, setToggle, id, checked}) {
	return (
		<div className={style.toggle_switch}>
			<input
				type='checkbox'
				className={style.toggle_switch_checkbox}
				checked={setToggle || checked}
				name={name}
				id={name}
				onChange={() => onChange(name, id)}
			/>
			<label className={style.toggle_switch_label} htmlFor={name}>
				<span className={style.toggle_switch_inner} />
				<span className={style.toggle_switch_switch} />
			</label>
		</div>
	);
}

export default ToggleSwitch;
