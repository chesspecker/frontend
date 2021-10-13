import React from 'react';
import dynamic from 'next/dynamic.js';
import 'react-chessground/dist/styles/chessground.css';
import style from './ChessGround.module.scss';

const Chessground = dynamic(() => import('react-chessground'), {ssr: false});

function ChessGround({onMove, fen, turnColor, movable, orientation}) {
	return (
		<Chessground
			className={style.chessGround}
			fen={fen}
			turnColor={turnColor}
			movable={movable}
			orientation={orientation}
			onMove={onMove}
		/>
	);
}

export default ChessGround;
