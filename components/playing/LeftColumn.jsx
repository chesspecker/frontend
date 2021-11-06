/* eslint-disable-next-line */
import {BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs';
import Image from 'next/image.js';
import rotate from '../../public/images/rotate.svg';
import fastForward from '../../public/images/fast-forward.svg';
import style from './LeftColumn.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function LeftColumn({
	changeSoundStatus,
	soundStatus,
	switchOrientation,
	toggleAutoMove,
	autoMove,
}) {
	return (
		<div className={style.container}>
			<div className={style.content}>
				<Tippy content='Sound preference'>
					<a className={style.icon_mute} onClick={changeSoundStatus}>
						{soundStatus ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
					</a>
				</Tippy>
			</div>
			<div className={style.content}>
				<Tippy content='Flip board'>
					<a className={style.icon_rotate} onClick={switchOrientation}>
						<Image src={rotate} width={50} height={50} />
					</a>
				</Tippy>
			</div>
			{autoMove && (
				<div className={`${style.content} ${style.autoMove_enabled}`}>
					<Tippy content='Jump to next puzzle immediately'>
						<a className={style.icon_enabled} onClick={toggleAutoMove}>
							<Image src={fastForward} width={50} height={50} />
						</a>
					</Tippy>
				</div>
			)}
			{!autoMove && (
				<div className={`${style.content} ${style.autoMove_disabled}`}>
					<Tippy content='Jump to next puzzle immediately'>
						<a className={style.icon_disabled} onClick={toggleAutoMove}>
							<Image src={fastForward} width={50} height={50} />
						</a>
					</Tippy>
				</div>
			)}
		</div>
	);
}
