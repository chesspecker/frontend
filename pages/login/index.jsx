import Link from 'next/link.js';
import Container from '../../components/layouts/Container.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import style from './index.module.css';

export default function LoginRegister() {
	return (
		<Container>
			<div className={style.container}>
				<div>
					<img className={style.logo} src='/images/logo.svg' />
					<h1 className={style.title}>
						Currenlty down
						<br />
						will be back in a few minutes
					</h1>
				</div>
			</div>
		</Container>
	);
}
