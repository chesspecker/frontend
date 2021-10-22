import Image from 'next/image.js';
import Link from 'next/link.js';
import logo from '../public/images/logo.svg';
import style from './NavBar.module.css';
import useUser from './hooks/useUser.jsx';

function NavBar() {
	const api = process.env.API;

	return (
		<div className={style.navBar}>
			<div className={style.navBar_logo}>
				<Link href='/dashboard'>
					<div className={style.logo}>
						<Image src={logo} />
					</div>
				</Link>
				<p className={style.navBar_title}> - chesspecker</p>
			</div>
			<div className={style.user}>
				{useUser() && <a href={`${api}/auth/logout`}>Logout</a>}
			</div>
		</div>
	);
}

export default NavBar;
