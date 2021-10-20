import {useState, useEffect} from 'react';
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

function Index() {
	const [puzzlesList, setPuzzlesList] = useState([]);
	const [puzzle, setPuzzle] = useState({});
	const [chess, setChess] = useState(new Chess());
	const [fen, setFen] = useState('');
	const [orientation, setOrientation] = useState('');
	const [turn, setTurn] = useState('w');
	const [history, setHistory] = useState([]);
	const [moveNumber, setMoveNumber] = useState(0);
	const [actualPuzzle, setActualPuzzle] = useState(0);
	const [puzzleSize, setPuzzleSize] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);
	const [counter, setCounter] = useState(0);
	const [sucessVisible, setSucessVisible] = useState(false);
	const [startPopupVisible, setStartPopupVisible] = useState(true);
	const [wrongMoveVisible, setWrongMoveVisible] = useState(false);
	const {currentUser} = useUserContext();
	const api = process.env.API;

	useEffect(() => {
		if (puzzlesList.length === 0) return;
		const getPuzzle = async () => {
			const {data: puzzle} = await http.get(
				`${api}/puzzles/id/${puzzlesList[actualPuzzle]}`,
				{
					withCredentials: true,
				},
			);
			setPuzzle(() => puzzle);
		};

		getPuzzle();
	}, [puzzlesList, actualPuzzle, api]);

	useEffect(() => {
		const getSet = async () => {
			const {data: set} = await http.get(
				`${api}/puzzles/set/id/${currentUser.currentSet}`,
				{
					withCredentials: true,
				},
			);
			setPuzzlesList(() => set.puzzles);
		};

		getSet();
	}, [api, currentUser.currentSet]);

	useEffect(() => {
		const timer = () => {
			setTimeout(() => setCounter(lastCount => lastCount + 1), 1000);
		};

		if (timerRunning) timer();
		if (!timerRunning) clearTimeout(timer);
	}, [timerRunning, counter]);

	useEffect(() => {
		if (puzzlesList.length === 0) return;
		setPuzzleSize(() => puzzlesList.length);
	}, [puzzlesList]);

	useEffect(() => {
		if (!puzzle.Moves) return;
		const chessJs = new Chess(puzzle.FEN);
		const history = puzzle.Moves.split(' ');
		console.log('history', history);

		setMoveNumber(() => 0);
		setHistory(() => history);
		setChess(() => chessJs);
		setFen(() => chessJs.fen());
		setTurn(() => chessJs.turn());
		setOrientation(() => (chessJs.turn() === 'b' ? 'white' : 'black'));
	}, [puzzle]);

	const rightMove = index => {
		chess.move(history[index], {sloppy: true});
		setFen(chess.fen());
		setMoveNumber(previousMove => previousMove + 1);
	};

	useEffect(() => {
		if (!history) return;
		if (moveNumber === 0) rightMove(moveNumber);
	}, [history, moveNumber, rightMove]);

	const onMove = (from, to) => {
		const move = chess.move({from, to, promotion: 'x'});
		const moves = chess.moves({verbose: true});

		/**
		 * FIXME: doesn't work, setPendingMove is undefined
		 */
		for (let i = 0, length_ = moves.length; i < length_; i++) {
			if (moves[i].flags.includes('p') && moves[i].from === from) {
				setPendingMove([from, to]);
				setSelectVisible(true);
				return;
			}
		}

		if (move && `${move.from}${move.to}` === history[moveNumber]) {
			setFen(() => chess.fen());
			setMoveNumber(previousMove => previousMove + 1);
			checkPuzzleComplete(moveNumber + 1);
			rightMove(moveNumber + 1);
		} else if (move) {
			chess.undo();
			setFen(() => chess.fen());
			setCounter(lastCount => lastCount + 3);
			setWrongMoveVisible(() => true);
			setTimeout(() => setWrongMoveVisible(() => false), 300);
		}
	};

	const changePuzzle = () => {
		setActualPuzzle(previousPuzzle => previousPuzzle + 1);
	};

	const checkSetComplete = async () => {
		if (actualPuzzle + 1 === puzzleSize) {
			setTimerRunning(() => false);
			setSucessVisible(() => true);
			/**
			 * TODO: make new put request
			await http.put(
				`${api}/puzzles/id/${puzzlesList[actualPuzzle]}`,
				{tries: 1, bestTime: counter},
				{withCredentials: true},
			);
			*/

			return true;
		}

		return false;
	};

	const checkPuzzleComplete = moveNumber => {
		console.log('moveNumber', moveNumber);
		console.log('history.length', history.length);
		if (moveNumber === history.length) {
			if (checkSetComplete()) return;
			changePuzzle();
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

	const switchOrientation = () => {
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);
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

export default Index;
