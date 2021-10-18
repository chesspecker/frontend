import NavBar from '../NavBar.jsx';
import Container from './Container.jsx';
import {UserProvider} from './UserProvider.jsx';

function PageHeader({children}) {
	return (
		<UserProvider>
			<Container>
				<NavBar />
				{children}
			</Container>
		</UserProvider>
	);
}

export default PageHeader;
