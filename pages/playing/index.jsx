import React, {useState, useEffect} from 'react';
import Image from 'next/image.js';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/Btn.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import {getPuzzle} from '../../services/puzzleService.js';
import style from './index.module.scss';

function index(props) {
	const [chess, setChess] = useState(new Chess());
	const [fen, setFen] = useState('');
	const [lastMove, setLastMove] = useState();
	const [orientation, setOrientation] = useState('white');
	const [moveHistory, setMoveHistory] = useState([]);
	const [turn, setTurn] = useState('w');
	const [pgn, setPgn] = useState([]);

	// TODO: à décommenter quand la backend sera fonctionnel :)
	/* 	useEffect(() => {
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
	}, []); */

	useEffect(() => {
		const puzzle = getPuzzle('61641996580b920793bacab6');
		const regex = /FEN "(.*?)"/g;
		const puzzleFen = regex.exec(puzzle.pgn)[1];
		const puzzlePgn = puzzle.pgn.split('\n');
		const puzzleMoves = puzzlePgn[puzzlePgn.length - 1];

		const newChess = new Chess(puzzleFen);

		setPgn(() => puzzle.pgn);

		setChess(() => {
			return newChess;
		});
		setFen(() => {
			return newChess.fen();
		});
		setTurn(() => {
			const turn = newChess.turn();

			return turn;
		});
	}, []);

	const onMove = (from, to) => {
		const move = chess.move({from, to, promotion: 'x'});
		const history = chess.history();
		console.log('history =', history);
		console.log('pgn =', pgn);
		console.log('chess move', move);
		const moves = chess.moves({verbose: true});
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			/* eslint-disable-line */
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		if (move) {
			setFen(() => {
				console.log(chess.fen());
				return chess.fen();
			});

			setLastMove([from, to]);
			setMoveHistory(() => {
				const lastMovs = [...moveHistory];
				lastMovs.push({from, to});

				return lastMovs;
			});
			setTimeout(rightMove, 500);
		}
	};

	const rightMove = () => {
		chess.move('Nxe5');
		setFen(chess.fen());
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

	const turnColor = string => {
		console.log(string);
		return string === 'w' ? 'white' : 'black';
	};

	const calcMovable = () => {
		const dests = new Map();

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
			color: turnColor(turn),
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
						turnColor={turnColor(chess.turn())}
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
