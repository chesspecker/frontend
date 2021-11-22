import STYLE from './level.module.scss';

export default function OptionLevel({handleChange}) {
	return (
		<div className={STYLE.container}>
			<div className={STYLE.container_input}>
				<label htmlFor='number_game' className={STYLE.container_description}>
					Difficulty level
				</label>
				<div className={STYLE.input_container}>
					<select
						id='puzzle-difficulty'
						name='difficulty'
						defaultValue='normal'
						className={STYLE.select_css}
						onChange={handleChange}
					>
						<option value='easiest' title='600 points below your puzzle rating'>
							Easiest (-600)
						</option>
						<option value='easier' title='300 points below your puzzle rating'>
							Easier (-300)
						</option>
						<option value='normal'>Normal</option>
						<option value='harder' title='300 points above your puzzle rating'>
							Harder (+300)
						</option>
						<option value='hardest' title='600 points above your puzzle rating'>
							Hardest (+600)
						</option>
					</select>
				</div>
			</div>
			<p className={STYLE.placeHolder}>
				Difficulty is based on your average Lichess rating
			</p>
		</div>
	);
}
