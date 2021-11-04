import dynamic from 'next/dynamic.js';
import style from './ChessGround.module.scss';

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
					? `${style.wrong_move} ${style.chessGround}`
					: rightMoveVisible
					? `${style.right_move} ${style.chessGround}`
					: finishMoveVisible
					? `${style.finish_move} ${style.chessGround}`
					: style.chessGround
			}
		>
			<Chessground
				addDimensionsCssVars
				fen={fen}
				turnColor={turnColor}
				movable={movable}
				orientation={orientation}
				style={{
					backgroundImage: `url(/images/board/${background})`,
				}}
				lastMove={lastMove}
				check={check}
				onMove={onMove}
			/>
		</div>
	);
}

export default ChessGround;
