import React from 'react';
import ToggleSwitch from '../layouts/ToggleSwitch.jsx';
import style from './OptionToggle.module.scss';

function OptionToggle({onChange, setName, setDescription, checked, children}) {
	return (
		<div className={style.option}>
			<p className={style.option_description}>{children}</p>
			<div style={{display: 'flex'}}>
				<p className={style.option_description}>{setDescription}</p>
				<ToggleSwitch name={setName} checked={checked} onChange={onChange} />
			</div>
		</div>
	);
}

export default OptionToggle;
