import React from 'react';
import style from './ToggleSwitch.module.scss';

function ToggleSwitch({name}) {
	return (
		<div className={style.toggle_switch}>
			<input
				type='checkbox'
				className={style.toggle_switch_checkbox}
				name={name}
				id={name}
			/>
			<label className={style.toggle_switch_label} htmlFor={name}>
				<span className={style.toggle_switch_inner} />
				<span className={style.toggle_switch_switch} />
			</label>
		</div>
	);
}

export default ToggleSwitch;
