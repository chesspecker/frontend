import Link from 'next/link.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import useClock from '../../hooks/useClock.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import style from './SucessPopup.module.scss';

function SucessPopup({restart, counter}) {
	return (
		<BackgroundPopup>
			<div className={style.sucess}>
				<p>🎉🎉 Good game 🎉🎉 !</p>
				<p>Time to solve this set : {useClock(counter)}</p>
				<div className={style.options}>
					<BtnSecondary onClick={restart}>RESTART</BtnSecondary>
					<Link href='/dashboard'>
						<BtnSecondary>Go to Dashboard</BtnSecondary>
					</Link>
				</div>
			</div>
		</BackgroundPopup>
	);
}

export default SucessPopup;
