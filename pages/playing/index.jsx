import React, {useState, useEffect} from 'react';
import Image from 'next/image.js';
import {shuffle} from 'help-array';
import useSound from 'use-sound';
import Router from 'next/router.js';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import SucessPopup from '../../components/layouts/popup/SucessPopup.jsx';
import StartingPopup from '../../components/layouts/popup/StartingPopup.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import useClock from '../../components/hooks/useClock.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import queenW from '../../public/images/pieces/merida/wQ.svg';
import rookW from '../../public/images/pieces/merida/wR.svg';
import bishopW from '../../public/images/pieces/merida/wB.svg';
import knightW from '../../public/images/pieces/merida/wN.svg';
import queenB from '../../public/images/pieces/merida/bQ.svg';
import rookB from '../../public/images/pieces/merida/bR.svg';
import bishopB from '../../public/images/pieces/merida/bB.svg';
import knightB from '../../public/images/pieces/merida/bN.svg';
import moveSound from '../../public/sounds/move.mp3';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import style from './index.module.scss';

function Index() {
	const api = process.env.API;
	const [fen, setFen] = useState('');
	const [malus, setMalus] = useState(0);
	const {currentUser} = useUserContext();
	const [turn, setTurn] = useState('w');
	const [soundMove] = useSound(moveSound);
	const [puzzle, setPuzzle] = useState({});
	const [lastMove, setLastMove] = useState();
	const [counter, setCounter] = useState(0);
	const [history, setHistory] = useState([]);
	const [moveNumber, setMoveNumber] = useState(0);
	const [chess, setChess] = useState(new Chess());
	const [pendingMove, setPendingMove] = useState();
	const [puzzleList, setPuzzleList] = useState([]);
	const [orientation, setOrientation] = useState('');
	const [actualPuzzle, setActualPuzzle] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [puzzleListSize, setPuzzleListSize] = useState(0);
	const [sucessVisible, setSucessVisible] = useState(false);
	const [selectVisible, setSelectVisible] = useState(false);
	const [startPopupVisible, setStartPopupVisible] = useState(true);
	const [wrongMoveVisible, setWrongMoveVisible] = useState(false);
	const [actualPuzzleMistake, setActualPuzzleMistake] = useState(0);
	const [previousPuzzleTimer, setPreviousPuzzleTimer] = useState(0);

	useEffect(() => {
		if (!puzzleList[actualPuzzle]) return;
		const puzzleToSet = puzzleList[actualPuzzle];
		console.log(puzzleToSet, puzzleToSet._id);
		if (puzzleList.length === 0) return;
		const getPuzzle = async () => {
			const {data: puzzle} = await http.get(
				`${api}/puzzles/id/${puzzleToSet._id}`,
				{withCredentials: true},
			);
			setPuzzle(() => puzzle);
		};

		getPuzzle();
	}, [puzzleList, actualPuzzle, api]);

	useEffect(() => {
		const getSet = async () => {
			const {data: set} = await http.get(
				`${api}/puzzles/set/id/${currentUser.currentSet}`,
				{withCredentials: true},
			);
			console.log(set);
			setCounter(() => set.currentTime);
			setPreviousPuzzleTimer(() => set.currentTime);

			const puzzleList = shuffle(set.puzzles.filter(p => p.played === false));
			setPuzzleList(() => puzzleList);
		};

		getSet();
	}, [api, currentUser.currentSet]);

	useEffect(() => {
		if (puzzleList.length === 0) return;
		setPuzzleListSize(() => puzzleList.length);
	}, [puzzleList]);

	useEffect(() => {
		const timer = () => {
			setTimeout(() => setCounter(lastCount => lastCount + 1), 1000);
		};

		if (timerRunning) timer();
		if (!timerRunning) clearTimeout(timer);
	}, [timerRunning, counter]);

	useEffect(() => {
		if (!puzzle.Moves) return;
		const chessJs = new Chess(puzzle.FEN);
		const history = puzzle.Moves.split(' ');

		console.log(currentUser.currentSet);
		setPendingMove(() => {});
		setLastMove(() => {});
		setMoveNumber(() => 0);
		setHistory(() => history);
		setChess(() => chessJs);
		setFen(() => chessJs.fen());
		setTurn(() => chessJs.turn());
		setOrientation(() => (chessJs.turn() === 'b' ? 'white' : 'black'));
	}, [puzzle]);

	const rightMove = index => {
		soundMove();
		const move = chess.move(history[index], {sloppy: true});
		if (move && move.from) setLastMove([move.from, move.to]);
		setFen(chess.fen());
		checkPuzzleComplete(moveNumber + 1);
		setMoveNumber(previousMove => previousMove + 1);
	};

	useEffect(() => {
		if (!history) return;
		if (moveNumber === 0) setTimeout(rightMove(moveNumber), 500);
	}, [history, moveNumber, rightMove]);

	const onMove = (from, to) => {
		soundMove();
		const move = chess.move({from, to, promotion: 'x'});
		const moves = chess.moves({verbose: true});
		const goodMove = history[moveNumber];
		const goodMoveWithoutPromote = goodMove.slice(0, -1);

		for (let i = 0, length_ = moves.length; i < length_; i++) {
			if (
				moves[i].flags.includes('p') &&
				moves[i].from === from &&
				`${from}${to}` === goodMoveWithoutPromote
			) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		console.log('validation', from, to, history[moveNumber]);

		if (move && `${move.from}${move.to}` === history[moveNumber]) {
			setFen(() => chess.fen());
			setMoveNumber(previousMove => previousMove + 1);
			checkPuzzleComplete(moveNumber);
			setLastMove([from, to]);
			setTimeout(rightMove(moveNumber + 1), 800);
		} else if (move) {
			chess.undo();
			setFen(() => chess.fen());
			setMalus(lastCount => lastCount + 3);
			setActualPuzzleMistake(previous => previous + 1);
			setWrongMoveVisible(() => true);
			setTimeout(() => setWrongMoveVisible(() => false), 300);
		}
	};

	const changePuzzle = async () => {
		const actualPuzzleId = puzzleList[actualPuzzle];
		console.log('actualpuzzle', actualPuzzleId);
		const timeTaken = counter - previousPuzzleTimer;
		console.log('time taken', timeTaken);
		const mistakes = actualPuzzleMistake;
		console.log('mistakes', mistakes);

		try {
			await http.put(
				`${api}/puzzles/set/id/${currentUser.currentSet}`,
				{puzzleId: actualPuzzleId._id, options: {mistakes, timeTaken}},
				{withCredentials: true},
			);
		} catch (error) {
			console.log(error);
		}

		setActualPuzzleMistake(() => 0);
		setPreviousPuzzleTimer(() => counter);
		setActualPuzzle(previousPuzzle => {
			console.log(previousPuzzle + 1);
			return previousPuzzle + 1;
		});
	};

	// Nombre d'erreur
	// time to play
	// puzzle id puis objet mistakes:number timeTaken:secondes

	const checkSetComplete = () => {
		if (actualPuzzle + 1 === puzzleListSize) {
			setTimerRunning(() => false);
			setSucessVisible(() => true);
			updatePuzzleFinished();

			return true;
		}

		return false;
	};

	const updatePuzzleFinished = async () => {
		await http.put(
			`${api}/puzzles/set/id/${currentUser.currentSet}`,
			{tries: 1, bestTime: counter + 1},
			{withCredentials: true},
		);
	};

	const checkPuzzleComplete = moveNumber => {
		if (moveNumber === history.length) {
			const isSetComplete = checkSetComplete();
			if (!isSetComplete) changePuzzle();
		}
	};

	const turnColor = string_ => (string_ === 'w' ? 'white' : 'black');

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
			color: turn === 'b' ? 'white' : 'black',
		};
	};

	const promotion = e => {
		const from = pendingMove[0];
		const to = pendingMove[1];
		const goodMove = history[moveNumber];
		const goodPromotion = goodMove.slice(-1);
		// Const move = chess.move({from, to, promotion: e});
		chess.move({from, to, promotion: e});
		if (e === goodPromotion) {
			setFen(chess.fen());
			setLastMove([from, to]);
			setMoveNumber(previousMove => previousMove + 1);
			setActualPuzzleMistake(previous => previous + 1);
			setSelectVisible(false);
			checkPuzzleComplete(moveNumber);
			setTimeout(rightMove(moveNumber + 1), 500);
		} else {
			setWrongMoveVisible(() => true);
			setTimeout(() => setWrongMoveVisible(() => false), 300);
		}
	};

	const switchOrientation = () =>
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);

	const handleRestart = () => {
		setActualPuzzle(() => 0);
		setCounter(() => 0);
		setMalus(() => 0);
		setTimerRunning(() => true);
		setSucessVisible(() => false);
	};

	const handleStart = () => {
		setMalus(() => 0);
		setStartPopupVisible(() => false);
		setTimerRunning(true);
	};

	const handleLeaveGame = () => {
		console.log('leave game');
		Router.push('/dashboard');
	};

	return (
		<PageHeader>
			{sucessVisible && (
				<SucessPopup counter={counter + malus} restart={handleRestart} />
			)}
			{startPopupVisible && <StartingPopup onStart={handleStart} />}

			<div className={style.container}>
				<div>
					<div className={style.information_container}>
						<div className={style.timer}>
							<p>⏲ {useClock(counter + malus)}</p>
						</div>
						<div>
							<BtnSecondary onClick={handleLeaveGame}>Leave game</BtnSecondary>
						</div>
					</div>
					<div className={style.chessGroundContainer}>
						{wrongMoveVisible && <div className={style.wrong_move}> +3 !!</div>}
						<ChessGround
							fen={fen}
							turnColor={turnColor(chess.turn())}
							movable={calcMovable()}
							orientation={orientation}
							lastMove={lastMove}
							check={chess.in_check()}
							onMove={onMove}
						/>
						<div
							style={selectVisible ? {display: 'flex'} : {display: 'none'}}
							className={style.promotion_container}
						>
							<div onClick={() => promotion('q')}>
								<Image
									src={chess.turn() === 'w' ? queenW : queenB}
									alt=''
									width={60}
									height={60}
								/>
							</div>
							<div onClick={() => promotion('r')}>
								<Image
									src={chess.turn() === 'w' ? rookW : rookB}
									alt=''
									width={60}
									height={60}
								/>
							</div>
							<div onClick={() => promotion('b')}>
								<Image
									src={chess.turn() === 'w' ? bishopW : bishopB}
									alt=''
									width={60}
									height={60}
								/>
							</div>
							<div onClick={() => promotion('n')}>
								<Image
									src={chess.turn() === 'w' ? knightW : knightB}
									alt=''
									width={60}
									height={60}
								/>
							</div>
						</div>
						{/* <div className={style.control_bar}>
							<button className={style.btn} onClick={switchOrientation}>
								<Image src={rotate} />
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default Index;
