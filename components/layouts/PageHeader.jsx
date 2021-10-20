import NavBar from '../NavBar.jsx';
import Container from './Container.jsx';

function PageHeader({children}) {
	return (
		<Container>
			<NavBar />
			{children}
		</Container>
	);
}

export default PageHeader;
