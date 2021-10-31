import {useState} from 'react';
import Slider from 'react-input-slider';
import style from './OptionSize.module.scss';

function OptionSize({handleChange}) {
	const [state, setState] = useState({x: 500});
	return (
		<div className={style.option}>
			<div className={style.option_input}>
				<label htmlFor='number_game' className={style.option_description}>
					Number of puzzles
				</label>
				<div>
					({state.x})
					<Slider
						axis='x'
						x={state.x}
						xmin={250}
						xmax={750}
						onChange={({x}) => {
							handleChange(x);
							return setState(state => ({...state, x}));
						}}
					/>
				</div>
			</div>
			<p className={style.placeHolder}>Recommended number is around 500</p>
		</div>
	);
}

export default OptionSize;
