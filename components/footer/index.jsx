import Image from 'next/image.js';
import Link from 'next/link.js';
import STYLE from './index.module.scss';
import github from '@/public/images/github.svg';

function Footer() {
	return (
		<div className={STYLE.footer}>
			<div className={STYLE.content}>
				<Link href='https://www.buymeacoffee.com/chessPecker'>
					<div className={STYLE.buyACoffee}>
						<p className={STYLE.buyACoffee_desc}>Buy us coffee</p>
					</div>
				</Link>
				<Link href='https://github.com/chesspecker'>
					<div className={STYLE.bugReport}>
						<p className={STYLE.bugReport_desc}>Bug report or ideas? 💡</p>
						<Image src={github} width={50} height={50} />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Footer;
