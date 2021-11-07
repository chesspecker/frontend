import Image from 'next/image.js';
import trash from '../../../public/images/trash.svg';
import BtnWarning from '../btn/BtnWarning.jsx';
import BtnSecondary from '../btn/BtnSecondary.jsx';
import style from './ConfirmRemovePopup.module.scss';
import ContainerPopup from './ContainerPopup.jsx';
import BackgroundPopup from './BackgroundPopup.jsx';

function ConfirmRemovePopup({onRemove}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>
				<div className={style.trash}>
					<Image src={trash} />
				</div>
				<h3 className={style.title}>
					Are you sure you want to remove this set?
				</h3>
				<div>
					<BtnSecondary onClick={() => onRemove(false)}>
						NO! GO BACK!
					</BtnSecondary>
					<BtnWarning onClick={() => onRemove(true)}>YES</BtnWarning>
				</div>
			</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ConfirmRemovePopup;
