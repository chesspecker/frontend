import INDEX_STYLE from './container.module.scss';

export default function ContainerPopup({children}) {
	return <div className={INDEX_STYLE.content}>{children}</div>;
}
