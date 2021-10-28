import PageHeader from '../../components/layouts/PageHeader.jsx';
import useConffeti from '../../components/hooks/useConffeti.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import useUserName from '../../components/hooks/useUsername.jsx';
import style from './index.module.css';

function Index() {
	return (
		<PageHeader>
			{useConffeti()}
			<div className={style.container}>
				<div>
					<h1 className={style.title}>
						Hello {useUserName()} 👋 <br /> Welcome to ChessPecker
					</h1>
					<Btn link='/dashboard'>LET&apos;S GO! 🔥</Btn>
				</div>
			</div>
		</PageHeader>
	);
}

export default Index;
