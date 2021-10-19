import React, {useState, useEffect, useContext} from 'react';
import Image from 'next/image.js';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import SucessPopup from '../../components/layouts/popup/SucessPopup.jsx';
import StartingPopup from '../../components/layouts/popup/StartingPopup.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import useClock from '../../components/hooks/useClock.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import style from './index.module.scss';

function index() {
	const [puzzlesList, setPuzzlesList] = useState([]);
	const [puzzle, setPuzzle] = useState({});
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
	const [startPopupVisible, setStartPopupVisible] = useState(true);
	const [wrongMoveVisible, setWrongMoveVisible] = useState(false);
	const {currentUser, updateCurrentUserName, updateCurrentSet} =
		useUserContext();
	const api = process.env.API;

	// TODO: à décommenter quand la backend sera fonctionnel :)
	useEffect(() => {
		if (puzzlesList.length === 0) return;

		const getPuzzle = async () => {
			const {data: puzlle} = await http.get(
				`${api}/puzzles/id/${puzzlesList[actualPuzzle]}`,
				{
					withCredentials: true,
				},
			);
			setPuzzle(() => puzlle);
			console.log('this is the puzzle', puzlle);
		};

		getPuzzle();
	}, [puzzlesList, actualPuzzle]);
	/* const getPuzzle = async id => {
		const {data: puzzle} = await http.get(`${api}/puzzles/id/${id}`, {
			withCredentials: true,
		});
		console.log('ceci est le puzzle', puzzle);
		return puzzle;
	}; */
	/* 
	const getSet = async () => {
		const {data: set} = await http.get(
			`${api}/puzzles/set/id/${currentUser.currentSet}`,
			{
				withCredentials: true,
			},
		);
		setPuzzlesList(() => set.puzzles);
		console.log('this is the set', set.puzzles);
		return set.puzzles;
	}; */

	useEffect(() => {
		const getSet = async () => {
			const {data: set} = await http.get(
				`${api}/puzzles/set/id/${currentUser.currentSet}`,
				{
					withCredentials: true,
				},
			);
			setPuzzlesList(() => set.puzzles);
			console.log('this is the set', set.puzzles);
		};

		getSet();
	}, []);

	useEffect(() => {
		const timer = () => {
			setTimeout(
				() =>
					setCounter(lastCount => {
						const newCount = lastCount + 1;
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

	useEffect(() => {
		if (puzzlesList.length === 0) return;
		const regex = /FEN "(.*?)"/g;
		console.log('puzzle dans dernier useEffect', puzzle);
		if (!puzzle.pgn) return;
		console.log('PGN =', puzzle.pgn);
		const puzzleFen = regex.exec(puzzle.pgn)[1];
		const pgnChess = new Chess();
		pgnChess.load_pgn(puzzle.pgn);
		const history = pgnChess.history();
		const newChess = new Chess(puzzleFen);

		setMoveHistory(() => []);
		setPuzzleSize(() => puzzlesList.length);
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
	}, [actualPuzzle, puzzlesList, puzzle]);

	const startTimer = () => {
		setTimerRunning(lastValue => {
			const newValue = !lastValue;
			return newValue;
		});
	};

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
		setWrongMoveVisible(() => true);
		setTimeout(() => setWrongMoveVisible(() => false), 300);
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

	const changePuzzle = () => {
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

			changePuzzle();
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

	const handleRestart = () => {
		setActualPuzzle(() => 0);
		setCounter(() => 0);
		setTimerRunning(() => true);
		setSucessVisible(() => false);
	};

	const handleStart = () => {
		setStartPopupVisible(() => false);
		setTimerRunning(true);
	};

	return (
		<PageHeader>
			{sucessVisible && (
				<SucessPopup counter={counter} restart={handleRestart} />
			)}
			{startPopupVisible && <StartingPopup onStart={handleStart} />}

			<div className={style.container}>
				<div>
					<div className={style.information_container}>
						<div className={style.timer}>
							<p>⏲ {useClock(counter)}</p>
						</div>
					</div>
					<div className={style.chessGroundContainer}>
						{wrongMoveVisible && <div className={style.wrong_move} />}
						<ChessGround
							fen={fen}
							turnColor={turnColor(chess.turn())}
							movable={calcMovable()}
							orientation={orientation}
							onMove={onMove}
						/>
						<div className={style.control_bar}>
							<button className={style.btn} onClick={switchOrientation}>
								<Image src={rotate} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default index;
