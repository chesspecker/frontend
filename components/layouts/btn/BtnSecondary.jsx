import style from './Btn.module.scss';

function BtnSecondary({onClick, children}) {
	return (
		<button className={style.btn_secondary} onClick={onClick}>
			{children}
		</button>
	);
}

export default BtnSecondary;
