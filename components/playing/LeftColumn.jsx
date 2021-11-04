/* eslint-disable-next-line */
import {BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs';
import Image from 'next/image.js';
import rotate from '../../public/images/rotate.svg';
import fastForward from '../../public/images/fast-forward.svg';
import style from './LeftColumn.module.scss';

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
				<a className={style.icon_mute} onClick={changeSoundStatus}>
					{soundStatus ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
				</a>
			</div>
			<div className={style.content}>
				<a className={style.icon_rotate} onClick={switchOrientation}>
					<Image src={rotate} width={50} height={50} />
				</a>
			</div>
			{autoMove && (
				<div className={`${style.content} ${style.autoMove_enabled}`}>
					<a className={style.icon_enabled} onClick={toggleAutoMove}>
						<Image src={fastForward} width={50} height={50} />
					</a>
				</div>
			)}
			{!autoMove && (
				<div className={`${style.content} ${style.autoMove_disabled}`}>
					<a className={style.icon_disabled} onClick={toggleAutoMove}>
						<Image src={fastForward} width={50} height={50} />
					</a>
				</div>
			)}
		</div>
	);
}
