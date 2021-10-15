import React, {useState, useEffect} from 'react';
import Image from 'next/image.js';
import {number} from 'prop-types';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import SucessPopup from '../../components/layouts/popup/SucessPopup.jsx';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import BackgroundPopup from '../../components/layouts/popup/BackgroundPopup.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import {getPuzzle, getPuzzleList} from '../../services/puzzleService.js';
import useClock from '../../components/hooks/useClock.jsx';
import style from './index.module.scss';

function index() {
	const [chess, setChess] = useState(new Chess());
	const [fen, setFen] = useState('');
	const [lastMove, setLastMove] = useState();
	const [orientation, setOrientation] = useState('');
	const [moveHistory, setMoveHistory] = useState([]); // A reset
	const [turn, setTurn] = useState('w');
	const [pgn, setPgn] = useState([]);
	const [history, setHistory] = useState([]);
	const [moveNumber, setMoveNumber] = useState(0);
	const [actualPuzzle, setActualPuzzle] = useState(0);
	const [puzzleSize, setPuzzleSize] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [counter, setCounter] = useState(0);
	const [sucessVisible, setSucessVisible] = useState(false);

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

	/* useEffect(() => {
		const getSet = async () => {
			const {data: set} = await http.get(
				`https://api.chesspecker.com/puzzles/sets`,
				{
					withCredentials: true,
				},
			);
			console.log(set);
		};

		getSet();
	}, []); */

	useEffect(() => {
		const timer = () => {
			setTimeout(
				() =>
					setCounter(lastCount => {
						const newCount = lastCount + 1;
						console.log(newCount);
						return newCount;
					}),
				1000,
			);
		};

		if (timerRunning) {
			timer();
		}

		if (!timerRunning) {
			clearTimeout(timer);
		}
	}, [timerRunning, counter]);

	const startTimer = () => {
		setTimerRunning(lastValue => {
			const newValue = !lastValue;
			return newValue;
		});
	};

	useEffect(() => {
		const puzzlList = getPuzzleList();
		const puzzle = getPuzzle(puzzlList[actualPuzzle]);
		const regex = /FEN "(.*?)"/g;
		const puzzleFen = regex.exec(puzzle.pgn)[1];
		const pgnChess = new Chess();
		pgnChess.load_pgn(puzzle.pgn);
		const history = pgnChess.history();
		const newChess = new Chess(puzzleFen);

		setMoveHistory(() => []);
		setPuzzleSize(() => puzzlList.length);
		setMoveNumber(() => 0);
		setHistory(() => history);
		setPgn(() => puzzle.pgn);
		setChess(() => newChess);
		setFen(() => newChess.fen());
		setTurn(() => {
			const turn = newChess.turn();
			setOrientation(() => {
				return turn === 'w' ? 'white' : 'black';
			});
			return turn;
		});
	}, [actualPuzzle]);

	const onMove = (from, to) => {
		const move = chess.move({from, to, promotion: 'x'});
		const moves = chess.moves({verbose: true});
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			/* eslint-disable-line */
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		if (move && move.san === history[moveNumber]) {
			setFen(() => chess.fen());
			setLastMove(move.san); // Move.san
			setMoveHistory(moveHistory => {
				const lastMovs = [...moveHistory];
				lastMovs.push(move.san);
				return lastMovs;
			});

			setMoveNumber(move => {
				const newMove = move + 1;
				setTimeout(() => checkPuzzleComplete(newMove), 800);
				rightMove(newMove);
				return newMove;
			});
		} else if (move) {
			goToPrevious();
		}
	};

	const goToPrevious = () => {
		setFen(() => chess.fen());
		chess.undo();
		setFen(() => chess.fen());
	};

	const rightMove = index => {
		const currentMove = history[index];
		chess.move(currentMove);
		setFen(chess.fen());
		setMoveNumber(move => {
			const newMove = move + 1;

			setTimeout(() => checkPuzzleComplete(newMove), 800);
			return newMove;
		});
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

	const changePage = () => {
		setActualPuzzle(previousPuzzle => {
			const nowPuzzle = previousPuzzle + 1;
			return nowPuzzle;
		});
	};

	const checkPuzzleComplete = newMove => {
		if (history.length === newMove + 1) {
			if (puzzleSize === actualPuzzle + 1) {
				setTimerRunning(() => false);
				setSucessVisible(() => true);
				return;
			}

			changePage();
		}
	};

	const turnColor = string => {
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
			{sucessVisible && <SucessPopup counter={counter} />}

			<div className={style.container}>
				<div className={style.chessGroundContainer}>
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
					<div className={style.btn_container}>
						<Btn onClick={startTimer}>
							{timerRunning ? 'Stop' : 'Start'} !!🔥
						</Btn>
					</div>
				</div>
				<div className={style.information_container}>
					<div className={style.timer}>
						<p>⏲ {useClock(counter)}</p>
					</div>
					<div className={style.dashboard} />
				</div>
			</div>
		</PageHeader>
	);
}

export default index;
