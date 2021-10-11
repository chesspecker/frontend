import React from 'react';
import ToggleSwitch from '../layouts/ToggleSwitch.jsx';
import style from './OptionToggle.module.scss';

function OptionToggle({setName, setToggle, children, onChange}) {
	return (
		<div
			className={`${style.option} ${style.option_secondary}`}
			style={setToggle ? {display: 'none'} : {display: 'flex'}}
		>
			<p htmlFor='number_game' className={style.option_description}>
				{children}
			</p>
			<ToggleSwitch name={setName} onChange={onChange} />
		</div>
	);
}

export default OptionToggle;