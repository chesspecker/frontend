import dynamic from 'next/dynamic.js';
import STYLE from './index.module.scss';

const Chessground = dynamic(() => import('react-chessground'), {ssr: false});

function ChessGround({
	onMove,
	fen,
	turnColor,
	movable,
	orientation,
	lastMove,
	check,
	background,
	wrongMoveVisible,
	rightMoveVisible,
	finishMoveVisible,
}) {
	return (
		<div
			className={
				wrongMoveVisible
					? `${STYLE.wrong_move} ${STYLE.chessGround}`
					: rightMoveVisible
					? `${STYLE.right_move} ${STYLE.chessGround}`
					: finishMoveVisible
					? `${STYLE.finish_move} ${STYLE.chessGround}`
					: STYLE.chessGround
			}
		>
			<Chessground
				addDimensionsCssVars
				fen={fen}
				turnColor={turnColor}
				movable={movable}
				orientation={orientation}
				style={{
					backgroundImage: `url(/board/${background})`,
				}}
				lastMove={lastMove}
				check={check}
				onMove={onMove}
			/>
		</div>
	);
}

export default ChessGround;
