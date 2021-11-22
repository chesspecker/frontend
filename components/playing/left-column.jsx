/* eslint-disable-next-line */
import {BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs';
import Image from 'next/image.js';
import Tippy from '@tippyjs/react';
import STYLE from './left-column.module.scss';
import rotate from '@/public/images/rotate.svg';
import fastForward from '@/public/images/fast-forward.svg';
import 'tippy.js/dist/tippy.css';

export default function LeftColumn({
	changeSoundStatus,
	soundStatus,
	switchOrientation,
	toggleAutoMove,
	autoMove,
}) {
	return (
		<div className={STYLE.container}>
			<div className={STYLE.content}>
				<Tippy content='Sound preference'>
					<a className={STYLE.icon_mute} onClick={changeSoundStatus}>
						{soundStatus ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
					</a>
				</Tippy>
			</div>
			<div className={STYLE.content}>
				<Tippy content='Flip board'>
					<a className={STYLE.icon_rotate} onClick={switchOrientation}>
						<Image src={rotate} width={50} height={50} />
					</a>
				</Tippy>
			</div>
			<Tippy content='Jump to next puzzle immediately'>
				<div
					className={
						autoMove
							? `${STYLE.content} ${STYLE.autoMove_enabled}`
							: `${STYLE.content} ${STYLE.autoMove_disabled}`
					}
				>
					<a
						className={autoMove ? STYLE.icon_enabled : STYLE.icon_disabled}
						onClick={toggleAutoMove}
					>
						<Image src={fastForward} width={50} height={50} />
					</a>
				</div>
			</Tippy>
		</div>
	);
}
