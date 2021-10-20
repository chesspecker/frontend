import dynamic from 'next/dynamic.js';
import style from './ChessGround.module.scss';

const Chessground = dynamic(() => import('react-chessground'), {ssr: false});

function ChessGround({onMove, fen, turnColor, movable, orientation}) {
	return (
		<div className={style.chessGround}>
			<Chessground
				addDimensionsCssVars
				fen={fen}
				turnColor={turnColor}
				movable={movable}
				orientation={orientation}
				style={{margin: '30px', backgroundColor: 'white'}}
				onMove={onMove}
			/>
		</div>
	);
}

export default ChessGround;
