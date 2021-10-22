import NavBar from './navBar/NavBar.jsx';
import Container from './Container.jsx';
import Footer from './footer/Footer.jsx';

function PageHeader({children}) {
	return (
		<Container>
			<NavBar />
			{children}
			<Footer />
		</Container>
	);
}

export default PageHeader;
