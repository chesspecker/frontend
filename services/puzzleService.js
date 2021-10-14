const puzzlesId = [
	'61641996580b920793bacab6',
	'6164198e580b920793bacab5',
	'616419ad580b920793bacab7',
	'616419b1580b920793bacab8',
	'616419d6580b920793bacab9',
];

const puzzles = [
	{
		_id: '61641996580b920793bacab6',
		game_id: '4lq0mjak',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event "Rated Blitz game"] [Site "https://lichess.org/4lq0MjAK"] [Date "2021.06.04"] [Round "?"] [White "Zishan4pride"] [Black "detnop"] [Result "0-1"] [BlackElo "1721"] [BlackRatingDiff "+6"] [ECO "B44"] [FEN "r4rk1/1b1p1ppp/p1n1p3/3qP3/QP3P2/3B4/2PB2PP/RR5K w - - 1 22"] [SetUp "1"] [Termination "Time forfeit"] [TimeControl "180+0"] [UTCDate "2021.06.04"] [UTCTime "20:43:28"] [Variant "Standard"] [WhiteElo "1694"] [WhiteRatingDiff "-5"] 22. Qa3 Nxe5 23. Bxh7+ Kxh7 24. Qh3+ Kg8 25. Rd1 0-1`,
	},
	{
		_id: '6164198e580b920793bacab5',
		game_id: 'vrjou0lh',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event "Rated Blitz game"] [Site "https://lichess.org/vRJOu0lH"] [Date "2021.06.06"] [Round "?"] [White "detnop"] [Black "GeorgeBest01"] [Result "1-0"] [BlackElo "1747"] [BlackRatingDiff "-6"] [ECO "A41"] [FEN "3rr1k1/2p1qpb1/p1n2n1p/1p3bp1/8/PNP1PR1P/1PB1Q1PB/3RN1K1 b - - 0 19"] [SetUp "1"] [Termination "Normal"] [TimeControl "180+0"] [UTCDate "2021.06.06"] [UTCTime "18:35:37"] [Variant "Standard"] [WhiteElo "1756"] [WhiteRatingDiff "+6"] 19... g4 20. Rxf5 Rxd1 21. Bxd1 Qe6 1-0`,
	},
	{
		_id: '616419ad580b920793bacab7',
		game_id: 'emec5kmv',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event "Rated Blitz game"] [Site "https://lichess.org/EmeC5KmV"] [Date "2021.06.02"] [Round "?"] [White "maxnosleeves"] [Black "detnop"] [Result "1-0"] [BlackElo "1715"] [BlackRatingDiff "-6"] [ECO "B40"] [FEN "4r1k1/5ppp/8/2b5/P3N1n1/7P/1PP2P2/4R1K1 b - - 0 27"] [SetUp "1"] [Termination "Normal"] [TimeControl "180+0"] [UTCDate "2021.06.02"] [UTCTime "20:15:09"] [Variant "Standard"] [WhiteElo "1715"] [WhiteRatingDiff "+6"] 27... Nf6 28. Nxf6+ gxf6 29. Rxe8+ Kg7 1-0`,
	},
	{
		_id: '616419b1580b920793bacab8',
		game_id: 'tfry7c5n',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event "Rated Blitz game"] [Site "https://lichess.org/tFRY7c5n"] [Date "2021.05.31"] [Round "?"] [White "sunkyyaki"] [Black "detnop"] [Result "0-1"] [BlackElo "1682"] [BlackRatingDiff "+5"] [ECO "B40"] [FEN "r2r2k1/bb3ppp/p1p1pn2/3pq1B1/1P2P3/2N2P2/P1P1B1PP/1R1Q1R1K w - - 4 16"] [SetUp "1"] [Termination "Normal"] [TimeControl "300+3"] [UTCDate "2021.05.31"] [UTCTime "19:20:48"] [Variant "Standard"] [WhiteElo "1641"] [WhiteRatingDiff "-5"] 16. f4 Qxc3 17. Rb3 Qd4 18. Qxd4 Bxd4 19. exd5 0-1`,
	},
	{
		_id: '616419d6580b920793bacab9',
		game_id: 'w3cl1m6a',
		user: 'detnop',
		category: 'Material',
		pgn: `[Event "Rated Blitz game"] [Site "https://lichess.org/w3Cl1M6A"] [Date "2021.05.12"] [Round "?"] [White "detnop"] [Black "OfficialSting"] [Result "0-1"] [BlackElo "1679"] [BlackRatingDiff "-5"] [ECO "D00"] [FEN "r3kbnr/pppqp2p/5p2/3p1bp1/1n1P1B2/3BP2P/PPPNQPP1/R3K1NR w KQkq - 0 8"] [SetUp "1"] [Termination "Normal"] [TimeControl "300+0"] [UTCDate "2021.05.12"] [UTCTime "17:57:51"] [Variant "Standard"] [WhiteElo "1688"] [WhiteRatingDiff "+7"] 8. Bh2 Bxd3 9. cxd3 Nc2+ 10. Kf1 Nxa1 11. Qh5+ Kd8 12. Qd1 0-1`,
	},
];

export const getPuzzle = id => {
	const puzzle = puzzles.find(e => e._id === id);
	return puzzle ? puzzle : error("Ce problème n'est pas dans la db");
};
