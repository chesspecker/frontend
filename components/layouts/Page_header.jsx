import React from 'react';
import NavBar from '../NavBar.jsx';
import Container from './Container.jsx';

function Page_header({children}) {
	return (
		<Container>
			<NavBar />
			{children}
		</Container>
	);
}

export default Page_header;
