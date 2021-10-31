import {useState, useEffect} from 'react';
import useSound from 'use-sound';
import router from 'next/router.js';
import Head from 'next/head.js';
import Chess from '../../components/utils/chess.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import SucessPopup from '../../components/layouts/popup/SucessPopup.jsx';
import StartingPopup from '../../components/layouts/popup/StartingPopup.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import useClock from '../../components/hooks/useClock.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import SOUND_MOVE from '../../public/sounds/Move.mp3';
import SOUND_CAPTURE from '../../public/sounds/Capture.mp3';
import SOUND_ERROR from '../../public/sounds/Error.mp3';
import SOUND_GENERIC from '../../public/sounds/GenericNotify.mp3';
import SOUND_VICTORY from '../../public/sounds/Victory.mp3';
import BtnSecondary from '../../components/layouts/btn/BtnSecondary.jsx';
import PromotionContainer from './PromotionContainer.jsx';
import RightColumn from './RightColumn.jsx';
import style from './index.module.scss';

const sortBy = (array, p) =>
	[...array].sort((a, b) => (a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0));

function Index() {
	const api = process.env.API;
	const [moveSound] = useSound(SOUND_MOVE);
	const [captureSound] = useSound(SOUND_CAPTURE);
	const [errorSound] = useSound(SOUND_ERROR);
	const [genericSound] = useSound(SOUND_GENERIC);
	const [victorySound] = useSound(SOUND_VICTORY);
	const [fen, setFen] = useState('');
	const {currentUser} = useUserContext();
	const [turn, setTurn] = useState('w');
	const [malus, setMalus] = useState(0);
	const [chess, setChess] = useState(new Chess());
	const [currentPuzzle, setCurrentPuzzle] = useState({});
	const [counter, setCounter] = useState(0);
	const [history, setHistory] = useState([]);
	const [lastMove, setLastMove] = useState();
	const [currentSet, setCurrentSet] = useState('');
	const [moveNumber, setMoveNumber] = useState(0);
	const [puzzleList, setPuzzleList] = useState([]);
	const [pendingMove, setPendingMove] = useState();
	const [orientation, setOrientation] = useState('');
	const [actualPuzzle, setActualPuzzle] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [sucessVisible, setSucessVisible] = useState(false);
	const [selectVisible, setSelectVisible] = useState(false);
	const [solutionVisible, setSolutionVisible] = useState(false);
	const [puzzleListLength, setPuzzleListLength] = useState(0);
	const [wrongMoveVisible, setWrongMoveVisible] = useState(false);
	const [startPopupVisible, setStartPopupVisible] = useState(true);
	const [mistakesNumber, setMistakesNumber] = useState(0);
	const [timerBeforeCurrentPuzzle, setTimerBeforeCurrentPuzzle] = useState(0);
	const [puzzleCompleteInSession, setPuzzleCompleteInSession] = useState(0);
	const [text, setText] = useState({
		title: 'Your turn',
		subtitle: `Find the best move.`,
	});

	/**
	 * Setup timer.
	 */
	useEffect(() => {
		const timer = () => {
			setTimeout(() => setCounter(lastCount => lastCount + 1), 1000);
		};

		if (timerRunning) timer();
		if (!timerRunning) clearTimeout(timer);
	}, [timerRunning, counter]);

	/**
	 * Retrieve the set.
	 * Extract the list of puzzles.
	 */
	useEffect(() => {
		const getSet = async () => {
			if (currentUser.currentSet.length > 5)
				localStorage.setItem('currentSet', currentUser.currentSet);
			let response;
			try {
				response = await http.get(
					`${api}/set/id/${localStorage.getItem('currentSet')}`,
					{withCredentials: true},
				);
			} catch (error) {
				return console.log(error);
			}

			const set = response.data;
			setCurrentSet(() => set);
			setCounter(() => set.currentTime);
			setTimerBeforeCurrentPuzzle(() => set.currentTime);

			let puzzleList = set.puzzles.filter(p => p.played === false);
			puzzleList = sortBy(puzzleList, 'order');
			setPuzzleList(() => puzzleList);
		};

		getSet();
	}, [currentUser.currentSet]);

	/**
	 * Set the number of puzzles remaining.
	 */
	useEffect(() => {
		if (puzzleList.length === 0) return;
		setPuzzleListLength(() => puzzleList.length);
	}, [puzzleList]);

	/**
	 * Wait to show solution button.
	 */
	useEffect(() => {
		const timeTaken = counter - timerBeforeCurrentPuzzle;
		if (timeTaken < 6) setSolutionVisible(() => false);
		if (timeTaken > 6) setSolutionVisible(() => true);
	}, [counter, timerBeforeCurrentPuzzle]);

	/**
	 * RightBar title.
	 */
	useEffect(() => {
		const text = {
			title: 'Your turn',
			subtitle: `Find the best move for ${orientation}.`,
		};
		setText(() => text);
	}, [orientation, actualPuzzle]);

	/**
	 * Retrieve current puzzle.
	 */
	useEffect(() => {
		if (!puzzleList[actualPuzzle] || puzzleList.length === 0) return;
		const puzzleToGet = puzzleList[actualPuzzle];
		const getCurrentPuzzle = async () => {
			let response;
			try {
				response = await http.get(`${api}/puzzle/${puzzleToGet._id}`, {
					withCredentials: true,
				});
			} catch (error) {
				return console.log(error);
			}

			const puzzle = response.data;

			setCurrentPuzzle(() => puzzle);
		};

		getCurrentPuzzle();
	}, [puzzleList, actualPuzzle]);

	/**
	 * Setup the board.
	 */
	useEffect(() => {
		if (!currentPuzzle.Moves) return;
		const chessJs = new Chess(currentPuzzle.FEN);
		const history = currentPuzzle.Moves.split(' ');

		setPendingMove(() => {});
		setLastMove(() => {});
		setMoveNumber(() => 0);
		setHistory(() => history);
		setChess(() => chessJs);
		setFen(() => chessJs.fen());
		setTurn(() => chessJs.turn());
		setOrientation(() => (chessJs.turn() === 'b' ? 'white' : 'black'));
	}, [currentPuzzle]);

	/**
	 * Function making the computer play the next move.
	 */
	const computerMove = index => {
		const move = chess.move(history[index], {sloppy: true});
		if (move && move.from) setLastMove([move.from, move.to]);
		setFen(chess.fen());
		checkPuzzleComplete(moveNumber + 1);
		setMoveNumber(previousMove => previousMove + 1);
		moveSound();
	};

	/**
	 * When the board is setup, make the first move.
	 */
	useEffect(() => {
		if (!history) return;
		if (moveNumber === 0) setTimeout(computerMove(moveNumber), 500);
	}, [history, moveNumber]);

	/**
	 * Allow only legal moves.
	 */
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
			draggable: {
				showGhost: true,
			},
		};
	};

	/**
	 * Function called when the user plays.
	 */
	const onMove = (from, to) => {
		const moves = chess.moves({verbose: true});
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		const move = chess.move({from, to, promotion: 'x'});
		if (move === null) return;
		if (move.captured) {
			captureSound();
		} else {
			moveSound();
		}

		const isCorrectMove = validateMove(move);
		if (isCorrectMove || chess.in_checkmate()) {
			setFen(() => chess.fen());
			setMoveNumber(previousMove => previousMove + 1);
			checkPuzzleComplete(moveNumber);
			setLastMove([from, to]);
			setTimeout(computerMove(moveNumber + 1), 800);
		} else {
			chess.undo();
			setFen(() => chess.fen());
			setMalus(lastCount => lastCount + 3);
			setMistakesNumber(previous => previous + 1);
			setWrongMoveVisible(() => true);
			errorSound();
			setTimeout(() => setWrongMoveVisible(() => false), 300);
			setText(() => ({
				title: `That's not the move!`,
				subtitle: `Try something else.`,
			}));
		}
	};

	/**
	 * Check if the move is valid.
	 */
	const validateMove = move => `${move.from}${move.to}` === history[moveNumber];

	/**
	 * Handle promotions via chessground.
	 */
	const promotion = piece => {
		setSelectVisible(false);
		const from = pendingMove[0];
		const to = pendingMove[1];
		const isCorrectMove = piece === history[moveNumber].slice(-1);
		chess.move({from, to, promotion: piece});

		if (isCorrectMove || chess.in_checkmate()) {
			setFen(() => chess.fen());
			setMoveNumber(previousMove => previousMove + 1);
			checkPuzzleComplete(moveNumber);
			setLastMove([from, to]);
			setTimeout(computerMove(moveNumber + 1), 800);
		} else {
			chess.undo();
			setFen(() => chess.fen());
			setMalus(lastCount => lastCount + 3);
			setMistakesNumber(previous => previous + 1);
			setWrongMoveVisible(() => true);
			errorSound();
			setTimeout(() => setWrongMoveVisible(() => false), 300);
		}
	};

	/**
	 * Called after each correct move.
	 */
	const checkPuzzleComplete = async moveNumber => {
		if (moveNumber === history.length) {
			const isSetComplete = await checkSetComplete();
			if (!isSetComplete) {
				genericSound();
				changePuzzle();
			}
		}
	};

	/**
	 * Called after each correct move.
	 */
	const checkSetComplete = async () => {
		if (actualPuzzle + 1 === puzzleListLength) {
			setTimerRunning(() => false);
			setSucessVisible(() => true);
			victorySound();
			await updateFinishedSet();
			return true;
		}

		return false;
	};

	/**
	 * Push the data of the current set when complete.
	 */
	const updateFinishedSet = async () => {
		try {
			await http.put(
				`${api}/set/complete/${localStorage.getItem('currentSet')}`,
				{cycles: true, bestTime: counter + 1},
				{withCredentials: true},
			);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Called when puzzle is completed, switch to the next one.
	 */
	const changePuzzle = async () => {
		await updateFinishedPuzzle();
		setPuzzleCompleteInSession(previous => previous + 1);
		setMistakesNumber(() => 0);
		setSolutionVisible(() => false);
		setTimerBeforeCurrentPuzzle(() => counter);
		setActualPuzzle(previousPuzzle => previousPuzzle + 1);
	};

	/**
	 * Push the data of the current set when complete.
	 */
	const updateFinishedPuzzle = async () => {
		const actualPuzzleId = puzzleList[actualPuzzle];
		const timeTaken = counter - timerBeforeCurrentPuzzle;
		const mistakes = mistakesNumber;
		try {
			await http.put(
				`${api}/puzzle/${localStorage.getItem('currentSet')}`,
				{puzzleId: actualPuzzleId._id, options: {mistakes, timeTaken}},
				{withCredentials: true},
			);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Return the correct turn color as a string.
	 */
	const turnColor = string_ => (string_ === 'w' ? 'white' : 'black');

	/**
	 * Useless for now but should be re-implemented.
	 * Needs a button
	 *
	 const switchOrientation = () =>
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);
	 */

	const handleRestart = () => {
		setPuzzleCompleteInSession(() => 0);
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
		router.push('/dashboard');
	};

	return (
		<>
			<Head>
				<title>Chesspecker - Playing</title>
				<meta property='og:title' content='Chesspecker' />
			</Head>
			<PageHeader>
				{sucessVisible && (
					<SucessPopup counter={counter + malus} restart={handleRestart} />
				)}
				{startPopupVisible && <StartingPopup onStart={handleStart} />}

				<div className={style.container}>
					<div className={style.information_container}>
						<div className={style.timer}>
							<p>⏲ {useClock(counter + malus)}</p>
						</div>
						<div>
							<BtnSecondary onClick={handleLeaveGame}>LEAVE 🧨</BtnSecondary>
						</div>
					</div>
					<div>
						<div className={style.chessGroundContainer}>
							{wrongMoveVisible && (
								<div className={style.wrong_move}>+3&quot;!</div>
							)}
							<div className={style.chessGround_left_container} />
							<ChessGround
								fen={fen}
								turnColor={turnColor(chess.turn())}
								movable={calcMovable()}
								orientation={orientation}
								lastMove={lastMove}
								check={chess.in_check()}
								onMove={onMove}
							/>
							<PromotionContainer
								chess={chess}
								promotion={promotion}
								selectVisible={selectVisible}
							/>
							<RightColumn
								percentage={
									(1 -
										(puzzleList.length - puzzleCompleteInSession) /
											currentSet.length) *
									100
								}
								text={text}
								solutionVisible={solutionVisible}
								nextMove={history[moveNumber]}
							/>
						</div>
					</div>
				</div>
			</PageHeader>
		</>
	);
}

export default Index;
