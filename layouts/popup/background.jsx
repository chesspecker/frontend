import INDEX_STYLE from './background.module.scss';

export default function BackgroundPopup({children}) {
	return <div className={INDEX_STYLE.popup}>{children}</div>;
}
