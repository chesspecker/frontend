import React from 'react';
import useWindowSize from './useWindowSize';
import Confetti from 'react-confetti';

export default () => {
	const {width, height} = useWindowSize();
	return (
		<Confetti width={width} height={height} recycle={false} gravity={0.05} />
	);
};
