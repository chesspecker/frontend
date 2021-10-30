import style from './OptionSize.module.scss';

function OptionSize({onChange, children, checked}) {
	return (
		<div className={style.option}>
			<div className={style.option_input}>
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
							Intermediate
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
			<p className={style.placeHolder}>
				Set of difficulty {checked} containing{' '}
				{checked === 'easy'
					? '400'
					: checked === 'intermediate'
					? '600'
					: '800'}{' '}
				problems
			</p>
		</div>
	);
}

export default OptionSize;
