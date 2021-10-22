import style from './Btn.module.scss';

function BtnWarning({onClick, children}) {
	return (
		<button className={style.btn_warning} onClick={onClick}>
			{children}
		</button>
	);
}

export default BtnWarning;
