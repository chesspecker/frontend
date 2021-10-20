import ToggleSwitch from '../btn/ToggleSwitch.jsx';
import style from './OptionSecondary.module.scss';

function OptionSecondary({setName, setToggle, children, onChange, id}) {
	return (
		<div className={`${style.option} ${style.option_secondary}`}>
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

export default OptionSecondary;
