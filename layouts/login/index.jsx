import Link from 'next/link.js';
import Image from 'next/image.js';
import STYLE from './index.module.scss';
import Button from '@/components/button/index.jsx';

function LoginRegister() {
	return (
		<div className={STYLE.page}>
			<div className={STYLE.container}>
				<Image
					className={STYLE.logo}
					src='/images/logo.svg'
					width='160px'
					height='160px'
				/>
				<h1 className={STYLE.title}>
					Happy to see you
					<br />
					newcomer 👋
				</h1>
				<div className={STYLE.contentBottom}>
					<Link href={`${process.env.API}/auth/login`}>
						<Button>SIGN IN WITH LICHESS</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default LoginRegister;
