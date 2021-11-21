import STYLE from './timer.module.scss';
import useClock from '@/hooks/use-clock.jsx';

function Timer({value}) {
	return (
		<div className={STYLE.timer}>
			<p>⏲ {useClock(value)}</p>
		</div>
	);
}

export default Timer;
