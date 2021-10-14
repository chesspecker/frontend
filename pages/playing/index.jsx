import React, {useState, useEffect} from 'react';
import Image from 'next/image.js';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import style from './index.module.scss';

function index(props) {
	const [chess, setChess] = useState(new Chess());
	const [fen, setFen] = useState('');
	const [lastMove, setLastMove] = useState();
	const [orientation, setOrientation] = useState('white');
	const [moveHistory, setMoveHistory] = useState([]);

	useEffect(() => {
		const getPuzzle = async () => {
			const {data: puzzle} = await http.get(
				`https://api.chesspecker.com/puzzles/id/61641984580b920793bacab4`,
				{
					withCredentials: true,
				},
			);
			console.log(puzzle);
		};

		getPuzzle();
	}, []);

	const onMove = (from, to) => {
		const moves = chess.moves({verbose: true});
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			/* eslint-disable-line */
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		if (chess.move({from, to, promotion: 'x'})) {
			setFen(chess.fen());
			setLastMove([from, to]);
			setMoveHistory(() => {
				const lastMovs = [...moveHistory];
				lastMovs.push({from, to});
				console.log(lastMovs);
				return lastMovs;
			});
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
		}
	};

	const turnColor = () => {
		return chess.turn() === 'w' ? 'white' : 'black';
	};

	const calcMovable = () => {
		const dests = new Map();
		console.log(dests);
		for (const s of chess.SQUARES) {
			const ms = chess.moves({square: s, verbose: true});
			if (ms.length > 0)
				dests.set(
					s,
					ms.map(m => m.to),
				);
		}

		return {
			free: false,
			dests,
			color: 'white',
		};
	};

	const switchOrientation = () => {
		setOrientation(() => (orientation === 'white' ? 'black' : 'white'));
	};

	return (
		<PageHeader>
			<div className={style.container}>
				<div>
					<ChessGround
						fen={fen}
						turnColor={turnColor()}
						movable={calcMovable()}
						orientation={orientation}
						onMove={onMove}
					/>
				</div>
				<div className={style.control_bar}>
					<button className={style.btn} onClick={switchOrientation}>
						<Image src={rotate} />
					</button>
				</div>
				<div className={style.dashboard}>
					{moveHistory.map(s => {
						return <div>{s.to}</div>;
					})}
				</div>
			</div>
		</PageHeader>
	);
}

export default index;
