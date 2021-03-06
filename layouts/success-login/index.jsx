import Link from 'next/link.js';
import STYLE from './index.module.scss';
import Container from '@/layouts/container/index.jsx';
import useConffeti from '@/hooks/use-conffeti.jsx';
import Button from '@/components/button/index.jsx';
import useUserName from '@/hooks/use-username.jsx';

export default function SuccessLogin() {
	return (
		<Container>
			{useConffeti()}
			<div className={STYLE.container}>
				<div>
					<h1 className={STYLE.title}>
						Hello {useUserName()} 👋 <br /> Welcome to ChessPecker
					</h1>
					<Link href='/dashboard'>
						<Button>LET&apos;S GO! 🔥</Button>
					</Link>
				</div>
			</div>
		</Container>
	);
}
