import {useState, useEffect} from 'react';
import Image from 'next/image.js';
import {shuffle} from 'help-array';
import Chess from '../../components/utils/chess.js';
import rotate from '../../public/images/rotate.svg';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import SucessPopup from '../../components/layouts/popup/SucessPopup.jsx';
import StartingPopup from '../../components/layouts/popup/StartingPopup.jsx';
import ChessGround from '../../components/layouts/ChessGround.jsx';
import http from '../../services/http-service.js';
import useClock from '../../components/hooks/useClock.jsx';
import {useUserContext} from '../../components/context/UserContext.jsx';
import queen from '../../public/images/pieces/merida/wK.svg';
import rook from '../../public/images/pieces/merida/wR.svg';
import bishop from '../../public/images/pieces/merida/wB.svg';
import knight from '../../public/images/pieces/merida/wN.svg';
import style from './index.module.scss';

function Index() {
	const api = process.env.API;
	const [fen, setFen] = useState('');
	const {currentUser} = useUserContext();
	const [turn, setTurn] = useState('w');
	const [chess, setChess] = useState(new Chess());
	const [puzzle, setPuzzle] = useState({});
	const [lastMove, setLastMove] = useState();
	const [counter, setCounter] = useState(0);
	const [history, setHistory] = useState([]);
	const [moveNumber, setMoveNumber] = useState(0);
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

	useEffect(() => {
		if (puzzleList.length === 0) return;
		const getPuzzle = async () => {
			const {data: puzzle} = await http.get(
				`${api}/puzzles/id/${puzzleList[actualPuzzle]}`,
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
			const puzzleList = shuffle(set.puzzles);
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
		setMoveNumber(() => 0);
		setHistory(() => history);
		setChess(() => chessJs);
		setFen(() => chessJs.fen());
		setTurn(() => chessJs.turn());
		setOrientation(() => (chessJs.turn() === 'b' ? 'white' : 'black'));
	}, [puzzle]);

	const rightMove = index => {
		console.log(history[index]);
		chess.move(history[index], {sloppy: true});
		// SetLastMove([chess.move.from, chess.move.to]);
		setFen(chess.fen());
		setMoveNumber(previousMove => previousMove + 1);
	};

	useEffect(() => {
		if (!history) return;
		if (moveNumber === 0) setTimeout(rightMove(moveNumber), 500);
	}, [history, moveNumber, rightMove]);

	const onMove = async (from, to) => {
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
			await checkPuzzleComplete(moveNumber + 1);
			setLastMove([from, to]);
			setTimeout(rightMove(moveNumber + 1), 800);
		} else if (move) {
			setTimeout(chess.undo(), 800);
			setFen(() => chess.fen());
			// SetCounter(lastCount => lastCount + 3);
			setWrongMoveVisible(() => true);
			setTimeout(() => setWrongMoveVisible(() => false), 300);
		}
	};

	const changePuzzle = () =>
		setActualPuzzle(previousPuzzle => previousPuzzle + 1);

	const checkSetComplete = async () => {
		if (actualPuzzle + 1 === puzzleListSize) {
			setTimerRunning(() => false);
			setSucessVisible(() => true);
			await http.put(
				`${api}/puzzles/id/${puzzlesList[actualPuzzle]}`,
				{tries: 1, bestTime: counter},
				{withCredentials: true},
			);

			return true;
		}

		return false;
	};

	const checkPuzzleComplete = async moveNumber => {
		if (moveNumber === history.length) {
			const isSetComplete = await checkSetComplete();
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
		chess.move({from, to, promotion: e});
		setFen(chess.fen());
		setLastMove([from, to]);
		setSelectVisible(false);
		setTimeout(rightMove, 500);
	};

	const switchOrientation = () =>
		setOrientation(orientation =>
			orientation === 'white' ? 'black' : 'white',
		);

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
							lastMove={lastMove}
							onMove={onMove}
						/>
						<div
							style={selectVisible ? {display: 'block'} : {display: 'none'}}
							className={style.promotion_container}
						>
							<div
								style={{
									textAlign: 'center',
									display: 'flex',
									cursor: 'pointer',
								}}
							>
								<span onClick={() => promotion('q')}>
									<Image src={queen} alt='' style={{width: 50}} />
								</span>
								<span onClick={() => promotion('r')}>
									<Image src={rook} alt='' style={{width: 50}} />
								</span>
								<span onClick={() => promotion('b')}>
									<Image src={bishop} alt='' style={{width: 50}} />
								</span>
								<span onClick={() => promotion('n')}>
									<Image src={knight} alt='' style={{width: 50}} />
								</span>
							</div>
						</div>
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
