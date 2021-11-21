import STYLE from './index.module.scss';
import Button from '@/components/button/index.jsx';

function LoginRegister() {
	return (
		<div className={STYLE.page}>
			<div className={STYLE.container}>
				<img className={STYLE.logo} src='/images/logo.svg' />
				<h1 className={STYLE.title}>
					Happy to see you
					<br />
					newcomer 👋
				</h1>
				<div className={STYLE.contentBottom}>
					<Button link={`${process.env.API}/auth/login`}>
						SIGN IN WITH LICHESS
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LoginRegister;
