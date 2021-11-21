import STYLE from './index.module.scss';

export default function Secondary({onClick, children}) {
	return (
		<button type='button' className={STYLE.button_secondary} onClick={onClick}>
			{children}
		</button>
	);
}
