import style from './ContainerPopup.module.scss';

function ContainerPopup({children}) {
	return <div className={style.content}>{children}</div>;
}

export default ContainerPopup;
