/* eslint-disable-next-line */
import {BsFillVolumeUpFill, BsFillVolumeMuteFill} from 'react-icons/bs';
import Image from 'next/image.js';
import rotate from '../../public/images/rotate.svg';
import style from './LeftColumn.module.scss';

export default function LeftColumn({
	changeSoundStatus,
	soundStatus,
	switchOrientation,
	toggleAutoMove,
}) {
	return (
		<div className={style.container}>
			<div className={style.content}>
				<btn className={style.icon_mute} onClick={changeSoundStatus}>
					{soundStatus ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
				</btn>
			</div>
			<div className={style.content}>
				<btn className={style.icon_rotate} onClick={switchOrientation}>
					<Image src={rotate} width={50} height={50} />
				</btn>
			</div>
		</div>
	);
}
