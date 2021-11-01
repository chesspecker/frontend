import useClock from '../../components/hooks/useClock.jsx';
import style from './index.module.scss';

function Timer({value}) {
	return (
		<div className={style.timer}>
			<p>⏲ {useClock(value)}</p>
		</div>
	);
}

export default Timer;
