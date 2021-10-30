import Container from '../../components/layouts/Container.jsx';
import style from './404.module.scss';

export default function PageNotFound() {
	return (
		<Container>
			<div className={style.container}>
				<div>
					<img className={style.logo} src='/images/logo.svg' />
					<h1 className={style.title}>404 - Page Not Found</h1>
				</div>
			</div>
		</Container>
	);
}
