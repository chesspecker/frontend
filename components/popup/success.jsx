import Link from 'next/link.js';
import ButtonSecondary from '../button/secondary.jsx';
import STYLE from './success.module.scss';
import PopupContainer from '@/layouts/popup/container.jsx';
import PopupBackground from '@/layouts/popup/background.jsx';
import useClock from '@/hooks/use-clock.jsx';

export default function SuccessPopup({restart, counter}) {
	return (
		<PopupBackground>
			<PopupContainer>
				<p>🎉 Good game 🎉</p>
				<p>Time spent : {useClock(counter)}</p>
				<div className={STYLE.options}>
					<ButtonSecondary onClick={restart}>RESTART</ButtonSecondary>
					<Link href='/dashboard'>
						<ButtonSecondary>DASHBOARD</ButtonSecondary>
					</Link>
				</div>
			</PopupContainer>
		</PopupBackground>
	);
}
