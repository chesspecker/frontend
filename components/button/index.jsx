import STYLE from './index.module.scss';

export default function Button({link, onClick, children}) {
	return (
		<a
			type='button'
			className={STYLE.button}
			href={link || '#'}
			onClick={onClick}
		>
			{children}
		</a>
	);
}
