import React, {useState} from 'react';
import Chess from '../../components/utils/chess.js';

import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import style from './index.module.scss';

function index(props) {
	const [chess, setChess] = useState(new Chess());
	const [fen, setFen] = useState('');
	const [lastMove, setLastMove] = useState();

	const onMove = (from, to) => {
		const moves = chess.moves({verbose: true});
		for (let i = 0, len = moves.length; i < len; i++) {
			/* eslint-disable-line */
			if (moves[i].flags.indexOf('p') !== -1 && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}
		if (chess.move({from, to, promotion: 'x'})) {
			setFen(chess.fen());
			setLastMove([from, to]);
			setTimeout(randomMove, 500);
		}
	};
	const randomMove = () => {
		const moves = chess.moves({verbose: true});
		const move = moves[Math.floor(Math.random() * moves.length)];
		if (moves.length > 0) {
			chess.move(move.san);
			setFen(chess.fen());
			setLastMove([move.from, move.to]);
			turnColor();
		}
	};
	const turnColor = () => {
		return chess.turn() === 'w' ? 'white' : 'black';
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<div>
					<ChessGround onMove={onMove} fen={fen} turnColor={turnColor()} />
				</div>
				<div className={style.content}>
					<Btn onClick={turnColor}>Test</Btn>
				</div>
			</div>
		</PageHeader>
	);
}

export default index;
