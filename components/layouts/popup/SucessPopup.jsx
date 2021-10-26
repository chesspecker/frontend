import Link from 'next/link.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import useClock from '../../hooks/useClock.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import style from './SucessPopup.module.scss';
import ContainerPopup from './ContainerPopup.jsx';

function SucessPopup({restart, counter}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<p>🎉 Good game 🎉 !</p>
				<p>Time to solve this set : {useClock(counter)}</p>
				<div className={style.options}>
					<BtnSecondary onClick={restart}>RESTART</BtnSecondary>
					<Link href='/dashboard'>
						<BtnSecondary>RETURN TO DASHBOARD</BtnSecondary>
					</Link>
				</div>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default SucessPopup;
