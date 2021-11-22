import STYLE from './index.module.scss';

export default function Button({onClick, children}) {
	return (
		<button type='button' className={STYLE.button} onClick={onClick}>
			{children}
		</button>
	);
}
