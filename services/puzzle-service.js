/* eslint-disable no-useless-escape, camelcase, no-alert */
const puzzlesId = [
	'61641996580b920793bacab6',
	'6164198e580b920793bacab5',
	'616419ad580b920793bacab7',
];

const puzzles = [
	{
		_id: '61641996580b920793bacab6',
		game_id: '4lq0mjak',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event \"Rated Blitz game\"]\n[Site \"https://lichess.org/4lq0MjAK\"]\n[Date \"2021.06.04\"]\n[Round \"?\"]\n[White \"Zishan4pride\"]\n[Black \"detnop\"]\n[Result \"0-1\"]\n[BlackElo \"1721\"]\n[BlackRatingDiff \"+6\"]\n[ECO \"B44\"]\n[FEN \"r4rk1/1b1p1ppp/p1n1p3/3qP3/QP3P2/3B4/2PB2PP/RR5K w - - 1 22\"]\n[SetUp \"1\"]\n[Termination \"Time forfeit\"]\n[TimeControl \"180+0\"]\n[UTCDate \"2021.06.04\"]\n[UTCTime \"20:43:28\"]\n[Variant \"Standard\"]\n[WhiteElo \"1694\"]\n[WhiteRatingDiff \"-5\"]\n\n22. Qa3 Nxe5 23. Bxh7+ Kxh7 24. Qh3+ Kg8 25. Rd1 0-1`,
	},
	{
		_id: '6164198e580b920793bacab5',
		game_id: 'vrjou0lh',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event \"Rated Blitz game\"]\n[Site \"https://lichess.org/vRJOu0lH\"]\n[Date \"2021.06.06\"]\n[Round \"?\"]\n[White \"detnop\"]\n[Black \"GeorgeBest01\"]\n[Result \"1-0\"]\n[BlackElo \"1747\"]\n[BlackRatingDiff \"-6\"]\n[ECO \"A41\"]\n[FEN \"3rr1k1/2p1qpb1/p1n2n1p/1p3bp1/8/PNP1PR1P/1PB1Q1PB/3RN1K1 b - - 0 19\"]\n[SetUp \"1\"]\n[Termination \"Normal\"]\n[TimeControl \"180+0\"]\n[UTCDate \"2021.06.06\"]\n[UTCTime \"18:35:37\"]\n[Variant \"Standard\"]\n[WhiteElo \"1756\"]\n[WhiteRatingDiff \"+6\"]\n\n19... g4 20. Rxf5 Rxd1 21. Bxd1 Qe6 1-0`,
	},
	{
		_id: '616419ad580b920793bacab7',
		game_id: 'emec5kmv',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event \"Rated Blitz game\"]\n[Site \"https://lichess.org/EmeC5KmV\"]\n[Date \"2021.06.02\"]\n[Round \"?\"]\n[White \"maxnosleeves\"]\n[Black \"detnop\"]\n[Result \"1-0\"]\n[BlackElo \"1715\"]\n[BlackRatingDiff \"-6\"]\n[ECO \"B40\"]\n[FEN \"4r1k1/5ppp/8/2b5/P3N1n1/7P/1PP2P2/4R1K1 b - - 0 27\"]\n[SetUp \"1\"]\n[Termination \"Normal\"]\n[TimeControl \"180+0\"]\n[UTCDate \"2021.06.02\"]\n[UTCTime \"20:15:09\"]\n[Variant \"Standard\"]\n[WhiteElo \"1715\"]\n[WhiteRatingDiff \"+6\"]\n\n27... Nf6 28. Nxf6+ gxf6 29. Rxe8+ Kg7 1-0`,
	},
];

export const getPuzzle = id => {
	const puzzleId = puzzles.find(puzzle => puzzle._id === id);
	return puzzleId ? puzzleId : alert("Ce problème n'est pas dans la db");
};

export const getPuzzleList = () => puzzlesId;
