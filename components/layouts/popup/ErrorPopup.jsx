import React from 'react';
import BackgroundPopup from './BackgroundPopup.jsx';
import ContainerPopup from './ContainerPopup.jsx';

function ErrorPopup({children}) {
	return (
		<BackgroundPopup>
			<ContainerPopup>{children}</ContainerPopup>
		</BackgroundPopup>
	);
}

export default ErrorPopup;
