import Link from 'next/link.js';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import useClock from '../../hooks/useClock.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';
import style from './SucessPopup.module.scss';
import ContainerPopup from './ContainerPopup.jsx';

function ChunkSucessPopup({keepPlaying, currentChunk}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<p>🎉 Well played ! 🎉</p>
				<p>
					You completed round {currentChunk}, you can move to round{' '}
					{currentChunk + 1}
				</p>
				<div className={style.options}>
					<BtnSecondary onClick={keepPlaying}>KEEP PLAYING</BtnSecondary>
					<Link href='/dashboard'>
						<BtnSecondary>DASHBOARD</BtnSecondary>
					</Link>
				</div>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ChunkSucessPopup;
