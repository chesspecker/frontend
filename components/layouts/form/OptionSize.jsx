import style from './OptionSize.module.scss';

function OptionSize({onChange, children, checked}) {
	return (
		<div className={style.option}>
			<label htmlFor='number_game' className={style.option_description}>
				{children}
			</label>
			<div className={style.input_container}>
				<div>
					<input
						className={style.input_radio}
						type='radio'
						id='easy'
						name='drone'
						value='easy'
						checked={Boolean(checked === 'easy' || checked === '')}
						onChange={onChange}
					/>
					<label className={style.label} htmlFor='easy'>
						Easy
					</label>
				</div>
				<div>
					<input
						className={style.input_radio}
						type='radio'
						id='intermediate'
						name='drone'
						value='intermediate'
						onChange={onChange}
					/>
					<label className={style.label} htmlFor='intermediate'>
						Medium
					</label>
				</div>
				<div>
					<input
						className={style.input_radio}
						type='radio'
						id='hard'
						name='drone'
						value='hard'
						onChange={onChange}
					/>
					<label className={style.label} htmlFor='hard'>
						Hard
					</label>
				</div>
			</div>
		</div>
	);
}

export default OptionSize;
