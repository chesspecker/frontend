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
					<p className={style.buYaCofee_desc}>
						Whant to support us ? Buy us a coffee{' '}
					</p>
				</div>
				<Link href='https://github.com/chesspecker'>
					<div className={style.bugReport}>
						<p className={style.bugReport_desc}>
							Found a bug ? add a issue on the repo !
						</p>
						<Image src={github} width={50} height={50} />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Footer;
