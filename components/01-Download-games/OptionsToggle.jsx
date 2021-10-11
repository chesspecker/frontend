import React from 'react';
import style from './OptionToggle.module.scss';
import ToggleSwitch from '../layouts/ToggleSwitch';

function OptionToggle({
	onChange,
	setName,
	setDescription,
	setToggle,
	children,
}) {
	return (
		<div className={style.option}>
			<p className={style.option_description}>{children}</p>
			<div style={{display: 'flex'}}>
				<p className={style.option_description}>{setDescription}</p>
				<ToggleSwitch name={setName} checked={setToggle} onChange={onChange} />
			</div>
		</div>
	);
}

export default OptionToggle;
