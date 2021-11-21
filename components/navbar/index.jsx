import Image from 'next/image.js';
import Link from 'next/link.js';
import STYLE from './index.module.scss';
import logo from '@/public/images/logo.svg';

function NavBar() {
	const api = process.env.API;

	return (
		<div className={STYLE.navBar}>
			<div className={STYLE.navBar_logo}>
				<Link href='/dashboard'>
					<div style={{display: 'flex'}}>
						<div className={STYLE.logo}>
							<Image src={logo} />
						</div>
						<p className={STYLE.navBar_title}> — Chesspecker</p>
					</div>
				</Link>
			</div>
			<div className={STYLE.user}>
				<a href={`${api}/auth/logout`}>Logout</a>
			</div>
		</div>
	);
}

export default NavBar;
