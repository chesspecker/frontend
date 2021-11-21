import Image from 'next/image.js';
import ButtonWarning from '../button/warning.jsx';
import ButtonSecondary from '../button/secondary.jsx';
import INDEX_STYLE from './confirm-remove.module.scss';
import trash from '@/public/images/trash.svg';
import PopupContainer from '@/layouts/popup/container.jsx';
import PopupBackground from '@/layouts/popup/background.jsx';

export default function ConfirmRemovePopup({onRemove}) {
	return (
		<PopupBackground>
			<PopupContainer>
				<div className={INDEX_STYLE.trash}>
					<Image src={trash} />
				</div>
				<h3 className={INDEX_STYLE.title}>
					Are you sure you want to remove this set?
				</h3>
				<div>
					<ButtonSecondary onClick={() => onRemove(false)}>
						NO! GO BACK!
					</ButtonSecondary>
					<ButtonWarning onClick={() => onRemove(true)}>YES</ButtonWarning>
				</div>
			</PopupContainer>
		</PopupBackground>
	);
}
