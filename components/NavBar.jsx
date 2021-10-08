import React from 'react';
import Image from 'next/image.js';
import logo from '../public/images/logo.svg';
import style from './NavBar.module.css';

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
