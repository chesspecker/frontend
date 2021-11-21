import INDEX_STYLE from './index.module.scss';
import Navbar from '@/components/navbar/index.jsx';
import Footer from '@/components/footer/index.jsx';

export default function Container({children}) {
	return (
		<div className={INDEX_STYLE.container}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
