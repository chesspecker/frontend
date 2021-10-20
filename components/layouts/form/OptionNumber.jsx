import style from './OptionNumber.module.scss';

function OptionNumber({onChange, setName, children, value}) {
	return (
		<div className={style.option}>
			<label htmlFor='number_game' className={style.option_description}>
				{children}
			</label>
			<input
				id={setName}
				className={style.input_number}
				type='number'
				value={value}
				placeholder='ex: 150'
				onChange={onChange}
			/>
		</div>
	);
}

export default OptionNumber;
