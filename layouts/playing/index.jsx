import {useState, useEffect, useCallback} from 'react';
import useSound from 'use-sound';
import Router from 'next/router.js';
import STYLE from './index.module.scss';

import SuccessPopup from '@/components/popup/success.jsx';
import StartingPopup from '@/components/popup/starting.jsx';
import ChessGround from '@/components/chessground/index.jsx';
import ButtonSecondary from '@/components/button/secondary.jsx';
import PromotionContainer from '@/components/playing/promotion-container.jsx';
import RightColumn from '@/components/playing/right-column.jsx';
import LeftColumn from '@/components/playing/left-column.jsx';
import Timer from '@/components/playing/timer.jsx';

import SOUND_MOVE from '@/sounds/Move.mp3';
import SOUND_CAPTURE from '@/sounds/Capture.mp3';
import SOUND_ERROR from '@/sounds/Error.mp3';
import SOUND_GENERIC from '@/sounds/GenericNotify.mp3';
import SOUND_VICTORY from '@/sounds/Victory.mp3';

import http from '@/lib/http.js';
import Chess from '@/lib/chess.js';

import Container from '@/layouts/container/index.jsx';

const sortBy = (array, p) =>
	[...array].sort((a, b) => (a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0));

const BOARD_LIST = [
	'blue.svg',
	'brown.svg',
	'gray.jpg',
	'green.svg',
	'leather.jpg',
	'marble.jpg',
	'purple.svg',
	'wood1.jpg',
	'wood2.jpg',
	'wood3.jpg',
];

function Index({currentSetProps}) {
	const api = process.env.API;
	const [moveSound] = useSound(SOUND_MOVE);
	const [captureSound] = useSound(SOUND_CAPTURE);
	const [errorSound] = useSound(SOUND_ERROR);
	const [genericSound] = useSound(SOUND_GENERIC);
	const [victorySound] = useSound(SOUND_VICTORY);
	const [isSoundDisabled, setIsSoundDisabled] = useState(false);

	const [fen, setFen] = useState('');
	const [turn, setTurn] = useState('w');
	const [malus, setMalus] = useState(0);
	const [chess, setChess] = useState(new Chess());
	const [counter, setCounter] = useState(0);

	const [history, setHistory] = useState([]);
	const [lastMove, setLastMove] = useState();
	const [moveNumber, setMoveNumber] = useState(0);
	const [gameLink, setGameLink] = useState('');
	const [mistakesNumber, setMistakesNumber] = useState(0);

	const [puzzleList, setPuzzleList] = useState([]);
	const [puzzleListLength, setPuzzleListLength] = useState(0);
	const [currentPuzzle, setCurrentPuzzle] = useState({});
	const [actualPuzzle, setActualPuzzle] = useState(0);
	const [puzzleCompleteInSession, setPuzzleCompleteInSession] = useState(0);

	const [pendingMove, setPendingMove] = useState();
	const [orientation, setOrientation] = useState('');

	const [timerRunning, setTimerRunning] = useState(false);
	const [timerBeforeCurrentPuzzle, setTimerBeforeCurrentPuzzle] = useState(0);

	const [isComplete, setIsComplete] = useState(false);
	const [autoMove, setAutoMove] = useState(true);

	const [sucessVisible, setSucessVisible] = useState(false);
	const [selectVisible, setSelectVisible] = useState(false);
	const [solutionVisible, setSolutionVisible] = useState(false);
	const [startPopupVisible, setStartPopupVisible] = useState(true);

	const [wrongMoveVisible, setWrongMoveVisible] = useState(false);
	const [rightMoveVisible, setRightMoveVisible] = useState(false);
	/* eslint-disable-next-line no-unused-vars */
	const [finishMoveVisible, setFinishMoveVisible] = useState(false);

	/* eslint-disable-next-line no-unused-vars */
	const [boardColor, setBoardColor] = useState(0);

	const [text, setText] = useState({
		title: 'Your turn',
		subtitle: `Find the best move.`,
	});

	/**
	 * Setup timer.
	 */
	useEffect(() => {
		const timer = () =>
			setTimeout(() => setCounter(lastCount => lastCount + 1), 1000);

		if (timerRunning) timer();
		if (!timerRunning) clearTimeout(timer);
	}, [timerRunning, counter]);

	/**
	 * Get last value setIsSoundDisabled
	 */
	useEffect(() => {
		let soundDisabled = localStorage.getItem('isSoundDisabled');
		if (soundDisabled === 'true') soundDisabled = true;
		if (soundDisabled === 'false') soundDisabled = false;
		setIsSoundDisabled(soundDisabled);
	}, []);

	/**
	 * Save setIsSoundDisabled to local storage
	 */
	useEffect(
		() => localStorage.setItem('isSoundDisabled', isSoundDisabled),
		[isSoundDisabled],
	);

	/**
	 * Get last value autoMove
	 */
	useEffect(() => {
		let newAutoMove = localStorage.getItem('autoMove');
		if (newAutoMove === 'true') newAutoMove = true;
		if (newAutoMove === 'false') newAutoMove = false;
		setAutoMove(newAutoMove);
	}, []);

	/**
	 * Save autoMove to local storage
	 */
	useEffect(() => localStorage.setItem('autoMove', autoMove), [autoMove]);

	/**
	 * Retrieve the set.
	 * Extract the list of puzzles.
	 */
	useEffect(() => {
		setCounter(currentSetProps.currentTime);
		setTimerBeforeCurrentPuzzle(currentSetProps.currentTime);
		const puzzleList = currentSetProps.puzzles.filter(p => p.played === false);
		const sortedPuzzleList = sortBy(puzzleList, 'order');
		setPuzzleList(() => sortedPuzzleList);
	}, [currentSetProps.currentTime, currentSetProps.puzzles]);

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
		const title = 'Your turn';
		const subtitle = `Find the best move for ${orientation}.`;
		const text = {title, subtitle};
		setText(() => text);
	}, [orientation, actualPuzzle]);

	/**
	 * Retrieve current puzzle.
	 */
	useEffect(() => {
		if (!puzzleList[actualPuzzle] || puzzleList.length === 0) return;
		const puzzleToGet = puzzleList[actualPuzzle];
		const getCurrentPuzzle = async () => {
			try {
				const response = await http.get(`${api}/puzzle/${puzzleToGet._id}`, {
					withCredentials: true,
				});
				setGameLink(() => response.data.GameUrl);
				setCurrentPuzzle(() => response.data);
			} catch (error) {
				return console.log(error);
			}
		};

		getCurrentPuzzle();
	}, [puzzleList, actualPuzzle, api]);

	/**
	 * Setup the board.
	 */
	useEffect(() => {
		if (!currentPuzzle.Moves) return;
		const chessJs = new Chess(currentPuzzle.FEN);
		const history = currentPuzzle.Moves.split(' ');

		setIsComplete(() => false);
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
	 * Push the data of the current set when complete.
	 */
	const updateFinishedPuzzle = useCallback(async () => {
		const actualPuzzleId = puzzleList[actualPuzzle];
		const timeTaken = counter - timerBeforeCurrentPuzzle;
		const mistakes = mistakesNumber;
		try {
			await http.put(
				`${api}/puzzle/${currentSetProps._id}`,
				{puzzleId: actualPuzzleId._id, options: {mistakes, timeTaken}},
				{withCredentials: true},
			);
		} catch (error) {
			console.log(error);
		}
	}, [
		actualPuzzle,
		api,
		counter,
		mistakesNumber,
		puzzleList,
		timerBeforeCurrentPuzzle,
		currentSetProps._id,
	]);

	/**
	 * Called when puzzle is completed, switch to the next one.
	 */
	const changePuzzle = useCallback(async () => {
		await updateFinishedPuzzle();
		setPuzzleCompleteInSession(previous => previous + 1);
		setMistakesNumber(() => 0);
		setSolutionVisible(() => false);
		setTimerBeforeCurrentPuzzle(() => counter);
		setActualPuzzle(previousPuzzle => previousPuzzle + 1);
	}, [counter, updateFinishedPuzzle]);

	/**
	 * Push the data of the current set when complete.
	 */
	const updateFinishedSet = useCallback(async () => {
		try {
			await http.put(
				`${api}/set/complete/${currentSetProps._id}`,
				{cycles: true, bestTime: counter + 1},
				{withCredentials: true},
			);
		} catch (error) {
			console.log(error);
		}
	}, [api, counter, currentSetProps]);

	/**
	 * Called after each correct move.
	 */
	const checkSetComplete = useCallback(async () => {
		if (actualPuzzle + 1 === puzzleListLength) {
			setTimerRunning(() => false);
			setSucessVisible(() => true);
			if (!isSoundDisabled) victorySound();
			/**
			 * Not working properly yet
			 * 
			setFinishMoveVisible(() => true);
			setTimeout(() => setFinishMoveVisible(() => false), 600);
			 */
			await updateFinishedSet();
			return true;
		}

		return false;
	}, [
		actualPuzzle,
		isSoundDisabled,
		puzzleListLength,
		updateFinishedSet,
		victorySound,
	]);

	/**
	 * Called after each correct move.
	 */
	const checkPuzzleComplete = useCallback(
		async moveNumber => {
			if (moveNumber === history.length) {
				const isSetComplete = await checkSetComplete();
				if (isSetComplete) return true;
				if (!isSoundDisabled) genericSound();
				/**
			 * Not working properly yet
			 * 
			setFinishMoveVisible(() => true);
			setTimeout(() => setFinishMoveVisible(() => false), 600);
			 */
				setIsComplete(() => true);
				if (autoMove) changePuzzle();
				return true;
			}

			return false;
		},
		[
			autoMove,
			changePuzzle,
			checkSetComplete,
			genericSound,
			history.length,
			isSoundDisabled,
		],
	);

	/**
	 * Function making the computer play the next move.
	 */
	const computerMove = useCallback(
		index => {
			const move = chess.move(history[index], {sloppy: true});
			if (move && move.from) setLastMove([move.from, move.to]);
			setFen(chess.fen());
			checkPuzzleComplete(moveNumber + 1);
			setMoveNumber(previousMove => previousMove + 1);
			if (!isSoundDisabled) moveSound();
		},
		[
			checkPuzzleComplete,
			chess,
			history,
			isSoundDisabled,
			moveNumber,
			moveSound,
		],
	);

	/**
	 * When the board is setup, make the first move.
	 */
	useEffect(() => {
		if (!history) return;
		if (moveNumber === 0) setTimeout(computerMove(moveNumber), 500);
	}, [history, moveNumber, computerMove]);

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

	const onRightMove = async (from, to) => {
		setFen(() => chess.fen());
		setMoveNumber(previousMove => previousMove + 1);
		setLastMove([from, to]);
		const isPuzzleComplete = await checkPuzzleComplete(moveNumber);
		if (isPuzzleComplete) return;
		setRightMoveVisible(() => true);
		setTimeout(() => setRightMoveVisible(() => false), 600);
		setTimeout(computerMove(moveNumber + 1), 800);
	};

	const onWrongMove = () => {
		chess.undo();
		setFen(() => chess.fen());
		setMalus(lastCount => lastCount + 3);
		setMistakesNumber(previous => previous + 1);
		if (!isSoundDisabled) errorSound();
		setWrongMoveVisible(() => true);
		setTimeout(() => setWrongMoveVisible(() => false), 600);
		setText(() => ({
			title: `That's not the move!`,
			subtitle: `Try something else.`,
		}));
	};

	/**
	 * Function called when the user plays.
	 */
	const onMove = async (from, to) => {
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
		if (move.captured && !isSoundDisabled) {
			captureSound();
		} else if (!isSoundDisabled) {
			moveSound();
		}

		const isCorrectMove = validateMove(move);
		if (isCorrectMove || chess.in_checkmate()) {
			await onRightMove(from, to);
		} else {
			onWrongMove();
		}
	};

	/**
	 * Check if the move is valid.
	 */
	const validateMove = move => `${move.from}${move.to}` === history[moveNumber];

	/**
	 * Handle promotions via chessground.
	 */
	const promotion = async piece => {
		setSelectVisible(false);
		const from = pendingMove[0];
		const to = pendingMove[1];
		const isCorrectMove = piece === history[moveNumber].slice(-1);
		chess.move({from, to, promotion: piece});

		if (isCorrectMove || chess.in_checkmate()) {
			onRightMove(from, to);
		} else {
			onWrongMove();
		}
	};

	/**
	 * Return the correct turn color as a string.
	 */
	const turnColor = string_ => (string_ === 'w' ? 'white' : 'black');

	/**
	 * Switch board orientation
	 */
	const switchOrientation = () =>
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);

	/**
	 * Toggle autoMove
	 */
	const toggleAutoMove = () => setAutoMove(previous => !previous);

	const toggleSound = () => setIsSoundDisabled(previous => !previous);

	const moveToNext = () => changePuzzle();

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
		Router.push('/dashboard');
	};

	const getPercentage = () =>
		(1 -
			(puzzleList.length - puzzleCompleteInSession) / currentSetProps.length) *
		100;

	return (
		<Container>
			{sucessVisible && (
				<SuccessPopup counter={counter + malus} restart={handleRestart} />
			)}
			{startPopupVisible && <StartingPopup onStart={handleStart} />}
			<div className={STYLE.container}>
				<div className={STYLE.information_container}>
					<Timer value={counter + malus} />
					<div>
						<ButtonSecondary onClick={handleLeaveGame}>
							LEAVE 🧨
						</ButtonSecondary>
					</div>
				</div>
				<div>
					<div className={STYLE.chessGroundContainer}>
						<div className={STYLE.chessGround_left_container} />
						<LeftColumn
							changeSoundStatus={toggleSound}
							soundStatus={isSoundDisabled}
							switchOrientation={switchOrientation}
							toggleAutoMove={toggleAutoMove}
							autoMove={autoMove}
						/>
						<div className={STYLE.plateau_container}>
							<ChessGround
								fen={fen}
								turnColor={turnColor(chess.turn())}
								movable={calcMovable()}
								orientation={orientation}
								lastMove={lastMove}
								check={chess.in_check()}
								background={BOARD_LIST[boardColor]}
								wrongMoveVisible={wrongMoveVisible}
								rightMoveVisible={rightMoveVisible}
								finishMoveVisible={finishMoveVisible}
								onMove={onMove}
							/>
						</div>
						<PromotionContainer
							chess={chess}
							promotion={promotion}
							selectVisible={selectVisible}
						/>
						<RightColumn
							percentage={getPercentage()}
							text={text}
							isComplete={isComplete}
							solutionVisible={solutionVisible}
							nextMove={history[moveNumber]}
							moveToNext={moveToNext}
							autoMove={autoMove}
							gameLink={gameLink}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Index;
