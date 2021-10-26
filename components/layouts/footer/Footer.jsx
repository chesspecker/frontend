import React from 'react';
import Image from 'next/image.js';
import Link from 'next/link.js';
import github from '../../../public/images/github.svg';
import style from './Footer.module.scss';

function Footer(props) {
	return (
		<div className={style.footer}>
			<div className={style.content}>
				<div className={style.buYaCofee}>
					<p className={style.buYaCofee_desc}>Made with 🤍 Buy us a ☕️ </p>
				</div>
				<Link href='https://github.com/chesspecker'>
					<div className={style.bugReport}>
						<p className={style.bugReport_desc}>Bug report or ideas? 💡</p>
						<Image src={github} width={50} height={50} />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Footer;
