import {useState} from 'react';
import Slider from 'react-input-slider';
import STYLE from './size.module.scss';

export default function OptionSize({handleChange}) {
	const [state, setState] = useState({x: 500});
	return (
		<div className={STYLE.option}>
			<div className={STYLE.option_input}>
				<label htmlFor='number_game' className={STYLE.option_description}>
					Number of puzzles: {state.x}
				</label>
				<div className={STYLE.container}>
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
			<p className={STYLE.placeHolder}>Recommended number is around 500</p>
		</div>
	);
}
