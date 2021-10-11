import React from 'react';
import ToggleSwitch from '../layouts/ToggleSwitch.jsx';
import style from './OptionToggle.module.scss';

function OptionToggle({setName, setToggle, children, onChange, id}) {
	return (
		<div
			className={`${style.option} ${style.option_secondary}`}
			// Style={setToggle ? {display: 'none'} : {display: 'flex'}}
		>
			<p htmlFor='number_game' className={style.option_description}>
				{children}
			</p>
			<ToggleSwitch
				name={setName}
				setToggle={setToggle}
				id={id}
				onChange={onChange}
			/>
		</div>
	);
}

export default OptionToggle;
