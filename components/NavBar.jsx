import React from 'react';
import style from './NavBar.module.css';
import Image from 'next/image';
import logo from '../public/images/logo.svg';

function NavBar(props) {
	return (
		<div className={style.navBar}>
			<div className={style.navBar_logo}>
				<div className={style.logo}>
					<Image src={logo} />
				</div>
				<p className={style.navBar_title}> - ChessPecker</p>
			</div>
		</div>
	);
}

export default NavBar;
