import React from 'react';
import dynamic from 'next/dynamic.js';
import 'react-chessground/dist/styles/chessground.css';

const Chessground = dynamic(() => import('react-chessground'), {ssr: false});

function ChessGround(props) {
	return <Chessground />;
}

export default ChessGround;
