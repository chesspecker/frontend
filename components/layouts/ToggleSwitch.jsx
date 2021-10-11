import React from 'react';
import style from './ToggleSwitch.module.scss';

function ToggleSwitch({name, checked, onChange}) {
	return (
		<div className={style.toggle_switch}>
			<input
				type='checkbox'
				className={style.toggle_switch_checkbox}
				checked={checked}
				name={name}
				id={name}
				onChange={() => onChange(name)}
			/>
			<label className={style.toggle_switch_label} htmlFor={name}>
				<span className={style.toggle_switch_inner} />
				<span className={style.toggle_switch_switch} />
			</label>
		</div>
	);
}

export default ToggleSwitch;
