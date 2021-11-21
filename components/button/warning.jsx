import STYLE from './index.module.scss';

export default function Warning({onClick, children}) {
	return (
		<button type='button' className={STYLE.button_warning} onClick={onClick}>
			{children}
		</button>
	);
}
