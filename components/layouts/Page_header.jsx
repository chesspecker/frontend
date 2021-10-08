import React from 'react';
import Container from './Container';
import NavBar from '../NavBar';

function Page_header({children}) {
	return (
		<Container>
			<NavBar />
			{children}
		</Container>
	);
}

export default Page_header;
