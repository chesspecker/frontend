import React from 'react';
import dynamic from 'next/dynamic.js';
import 'react-chessground/dist/styles/chessground.css';

const Chessground = dynamic(() => import('react-chessground'), {ssr: false});

function ChessGround({onMove, fen, turnColor}) {
	return <Chessground fen={fen} turnColor={turnColor} onMove={onMove} />;
}

export default ChessGround;
