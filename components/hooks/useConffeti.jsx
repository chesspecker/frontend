import React from 'react';
import Confetti from 'react-confetti';
import useWindowSize from './useWindowSize.jsx';

export default () => {
	const {width, height} = useWindowSize();
	return <Confetti width={width} height={height} />;
};
