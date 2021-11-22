/* eslint-disable */

/*
 * Copyright (c) 2021, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

const Chess = function (fen) {
	const BLACK = 'b';
	const WHITE = 'w';

	const EMPTY = -1;

	const PAWN = 'p';
	const KNIGHT = 'n';
	const BISHOP = 'b';
	const ROOK = 'r';
	const QUEEN = 'q';
	const KING = 'k';

	const SYMBOLS = 'pnbrqkPNBRQK';

	const DEFAULT_POSITION =
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	const TERMINATION_MARKERS = new Set(['1-0', '0-1', '1/2-1/2', '*']);

	const PAWN_OFFSETS = {
		b: [16, 32, 17, 15],
		w: [-16, -32, -17, -15],
	};

	const PIECE_OFFSETS = {
		n: [-18, -33, -31, -14, 18, 33, 31, 14],
		b: [-17, -15, 17, 15],
		r: [-16, 1, 16, -1],
		q: [-17, -16, -15, 1, 17, 16, 15, -1],
		k: [-17, -16, -15, 1, 17, 16, 15, -1],
	};

	// prettier-ignore
	const ATTACKS = [
      20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
       0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
       0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
       0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
       0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
      24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
       0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
       0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
       0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
       0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
      20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
    ];

	// prettier-ignore
	const RAYS = [
       17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
        0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
        0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
        0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
        0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
        0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
        0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
        1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
        0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
        0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
        0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
        0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
        0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
        0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
      -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
    ];

	const SHIFTS = {p: 0, n: 1, b: 2, r: 3, q: 4, k: 5};

	const FLAGS = {
		NORMAL: 'n',
		CAPTURE: 'c',
		BIG_PAWN: 'b',
		EP_CAPTURE: 'e',
		PROMOTION: 'p',
		KSIDE_CASTLE: 'k',
		QSIDE_CASTLE: 'q',
	};

	const BITS = {
		NORMAL: 1,
		CAPTURE: 2,
		BIG_PAWN: 4,
		EP_CAPTURE: 8,
		PROMOTION: 16,
		KSIDE_CASTLE: 32,
		QSIDE_CASTLE: 64,
	};

	const RANK_1 = 7;
	const RANK_2 = 6;
	const RANK_3 = 5;
	const RANK_4 = 4;
	const RANK_5 = 3;
	const RANK_6 = 2;
	const RANK_7 = 1;
	const RANK_8 = 0;

	// prettier-ignore
	const SQUARES = {
      a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
      a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
      a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
      a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
      a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
      a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
      a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
      a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
    };

	const ROOKS = {
		w: [
			{square: SQUARES.a1, flag: BITS.QSIDE_CASTLE},
			{square: SQUARES.h1, flag: BITS.KSIDE_CASTLE},
		],
		b: [
			{square: SQUARES.a8, flag: BITS.QSIDE_CASTLE},
			{square: SQUARES.h8, flag: BITS.KSIDE_CASTLE},
		],
	};

	let board = Array.from({length: 128});
	let kings = {w: EMPTY, b: EMPTY};
	let turn = WHITE;
	let castling = {w: 0, b: 0};
	let ep_square = EMPTY;
	let half_moves = 0;
	let move_number = 1;
	let history = [];
	let header = {};
	let comments = {};

	/* If the user passes in a fen string, load it, else default to
	 * starting position
	 */
	if (typeof fen === 'undefined') {
		load(DEFAULT_POSITION);
	} else {
		load(fen);
	}

	function clear(keep_headers) {
		if (typeof keep_headers === 'undefined') {
			keep_headers = false;
		}

		board = Array.from({length: 128});
		kings = {w: EMPTY, b: EMPTY};
		turn = WHITE;
		castling = {w: 0, b: 0};
		ep_square = EMPTY;
		half_moves = 0;
		move_number = 1;
		history = [];
		if (!keep_headers) header = {};
		comments = {};
		update_setup(generate_fen());
	}

	function prune_comments() {
		const reversed_history = [];
		const current_comments = {};
		const copy_comment = function (fen) {
			if (fen in comments) {
				current_comments[fen] = comments[fen];
			}
		};

		while (history.length > 0) {
			reversed_history.push(undo_move());
		}

		copy_comment(generate_fen());
		while (reversed_history.length > 0) {
			make_move(reversed_history.pop());
			copy_comment(generate_fen());
		}

		comments = current_comments;
	}

	function reset() {
		load(DEFAULT_POSITION);
	}

	function load(fen, keep_headers) {
		if (typeof keep_headers === 'undefined') {
			keep_headers = false;
		}

		const tokens = fen.split(/\s+/);
		const position = tokens[0];
		let square = 0;

		if (!validate_fen(fen).valid) {
			return false;
		}

		clear(keep_headers);

		for (let i = 0; i < position.length; i++) {
			const piece = position.charAt(i);

			if (piece === '/') {
				square += 8;
			} else if (is_digit(piece)) {
				square += Number.parseInt(piece, 10);
			} else {
				const color = piece < 'a' ? WHITE : BLACK;
				put({type: piece.toLowerCase(), color}, algebraic(square));
				square++;
			}
		}

		turn = tokens[1];

		if (tokens[2].includes('K')) {
			castling.w |= BITS.KSIDE_CASTLE;
		}

		if (tokens[2].includes('Q')) {
			castling.w |= BITS.QSIDE_CASTLE;
		}

		if (tokens[2].includes('k')) {
			castling.b |= BITS.KSIDE_CASTLE;
		}

		if (tokens[2].includes('q')) {
			castling.b |= BITS.QSIDE_CASTLE;
		}

		ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]];
		half_moves = Number.parseInt(tokens[4], 10);
		move_number = Number.parseInt(tokens[5], 10);

		update_setup(generate_fen());

		return true;
	}

	/* TODO: this function is pretty much crap - it validates structure but
	 * completely ignores content (e.g. doesn't verify that each side has a king)
	 * ... we should rewrite this, and ditch the silly error_number field while
	 * we're at it
	 */
	function validate_fen(fen) {
		const errors = {
			0: 'No errors.',
			1: 'FEN string must contain six space-delimited fields.',
			2: '6th field (move number) must be a positive integer.',
			3: '5th field (half move counter) must be a non-negative integer.',
			4: '4th field (en-passant square) is invalid.',
			5: '3rd field (castling availability) is invalid.',
			6: '2nd field (side to move) is invalid.',
			7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
			8: '1st field (piece positions) is invalid [consecutive numbers].',
			9: '1st field (piece positions) is invalid [invalid piece].',
			10: '1st field (piece positions) is invalid [row too large].',
			11: 'Illegal en-passant square',
		};

		/* 1st criterion: 6 space-seperated fields? */
		const tokens = fen.split(/\s+/);
		if (tokens.length !== 6) {
			return {valid: false, error_number: 1, error: errors[1]};
		}

		/* 2nd criterion: move number field is a integer value > 0? */
		if (isNaN(tokens[5]) || Number.parseInt(tokens[5], 10) <= 0) {
			return {valid: false, error_number: 2, error: errors[2]};
		}

		/* 3rd criterion: half move counter is an integer >= 0? */
		if (isNaN(tokens[4]) || Number.parseInt(tokens[4], 10) < 0) {
			return {valid: false, error_number: 3, error: errors[3]};
		}

		/* 4th criterion: 4th field is a valid e.p.-string? */
		if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
			return {valid: false, error_number: 4, error: errors[4]};
		}

		/* 5th criterion: 3th field is a valid castle-string? */
		if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
			return {valid: false, error_number: 5, error: errors[5]};
		}

		/* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
		if (!/^(w|b)$/.test(tokens[1])) {
			return {valid: false, error_number: 6, error: errors[6]};
		}

		/* 7th criterion: 1st field contains 8 rows? */
		const rows = tokens[0].split('/');
		if (rows.length !== 8) {
			return {valid: false, error_number: 7, error: errors[7]};
		}

		/* 8th criterion: every row is valid? */
		for (const row of rows) {
			/* Check for right sum of fields AND not two numbers in succession */
			let sum_fields = 0;
			let previous_was_number = false;

			for (const element of row) {
				if (!isNaN(element)) {
					if (previous_was_number) {
						return {valid: false, error_number: 8, error: errors[8]};
					}

					sum_fields += Number.parseInt(element, 10);
					previous_was_number = true;
				} else {
					if (!/^[prnbqkPRNBQK]$/.test(element)) {
						return {valid: false, error_number: 9, error: errors[9]};
					}

					sum_fields += 1;
					previous_was_number = false;
				}
			}

			if (sum_fields !== 8) {
				return {valid: false, error_number: 10, error: errors[10]};
			}
		}

		if (
			(tokens[3][1] == '3' && tokens[1] == 'w') ||
			(tokens[3][1] == '6' && tokens[1] == 'b')
		) {
			return {valid: false, error_number: 11, error: errors[11]};
		}

		/* Everything's okay! */
		return {valid: true, error_number: 0, error: errors[0]};
	}

	function generate_fen() {
		let empty = 0;
		let fen = '';

		for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
			if (board[i] == null) {
				empty++;
			} else {
				if (empty > 0) {
					fen += empty;
					empty = 0;
				}

				const color = board[i].color;
				const piece = board[i].type;

				fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
			}

			if ((i + 1) & 0x88) {
				if (empty > 0) {
					fen += empty;
				}

				if (i !== SQUARES.h1) {
					fen += '/';
				}

				empty = 0;
				i += 8;
			}
		}

		let cflags = '';
		if (castling[WHITE] & BITS.KSIDE_CASTLE) {
			cflags += 'K';
		}

		if (castling[WHITE] & BITS.QSIDE_CASTLE) {
			cflags += 'Q';
		}

		if (castling[BLACK] & BITS.KSIDE_CASTLE) {
			cflags += 'k';
		}

		if (castling[BLACK] & BITS.QSIDE_CASTLE) {
			cflags += 'q';
		}

		/* Do we have an empty castling flag? */
		cflags = cflags || '-';
		const epflags = ep_square === EMPTY ? '-' : algebraic(ep_square);

		return [fen, turn, cflags, epflags, half_moves, move_number].join(' ');
	}

	function set_header(args) {
		for (let i = 0; i < args.length; i += 2) {
			if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
				header[args[i]] = args[i + 1];
			}
		}

		return header;
	}

	/* Called when the initial board setup is changed with put() or remove().
	 * modifies the SetUp and FEN properties of the header object.  if the FEN is
	 * equal to the default position, the SetUp and FEN are deleted
	 * the setup is only updated if history.length is zero, ie moves haven't been
	 * made.
	 */
	function update_setup(fen) {
		if (history.length > 0) return;

		if (fen !== DEFAULT_POSITION) {
			header.SetUp = '1';
			header.FEN = fen;
		} else {
			delete header.SetUp;
			delete header.FEN;
		}
	}

	function get(square) {
		const piece = board[SQUARES[square]];
		return piece ? {type: piece.type, color: piece.color} : null;
	}

	function put(piece, square) {
		/* Check for valid piece object */
		if (!('type' in piece && 'color' in piece)) {
			return false;
		}

		/* Check for piece */
		if (!SYMBOLS.includes(piece.type.toLowerCase())) {
			return false;
		}

		/* Check for valid square */
		if (!(square in SQUARES)) {
			return false;
		}

		const sq = SQUARES[square];

		/* Don't let the user place more than one king */
		if (
			piece.type == KING &&
			!(kings[piece.color] == EMPTY || kings[piece.color] == sq)
		) {
			return false;
		}

		board[sq] = {type: piece.type, color: piece.color};
		if (piece.type === KING) {
			kings[piece.color] = sq;
		}

		update_setup(generate_fen());

		return true;
	}

	function remove(square) {
		const piece = get(square);
		board[SQUARES[square]] = null;
		if (piece && piece.type === KING) {
			kings[piece.color] = EMPTY;
		}

		update_setup(generate_fen());

		return piece;
	}

	function build_move(board, from, to, flags, promotion) {
		const move = {
			color: turn,
			from,
			to,
			flags,
			piece: board[from].type,
		};

		if (promotion) {
			move.flags |= BITS.PROMOTION;
			move.promotion = promotion;
		}

		if (board[to]) {
			move.captured = board[to].type;
		} else if (flags & BITS.EP_CAPTURE) {
			move.captured = PAWN;
		}

		return move;
	}

	function generate_moves(options) {
		function add_move(board, moves, from, to, flags) {
			/* If pawn promotion */
			if (
				board[from].type === PAWN &&
				(rank(to) === RANK_8 || rank(to) === RANK_1)
			) {
				const pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
				for (let i = 0, length_ = pieces.length; i < length_; i++) {
					moves.push(build_move(board, from, to, flags, pieces[i]));
				}
			} else {
				moves.push(build_move(board, from, to, flags));
			}
		}

		const moves = [];
		const us = turn;
		const them = swap_color(us);
		const second_rank = {b: RANK_7, w: RANK_2};

		let first_sq = SQUARES.a8;
		let last_sq = SQUARES.h1;
		let single_square = false;

		/* Do we want legal moves? */
		const legal =
			typeof options !== 'undefined' && 'legal' in options
				? options.legal
				: true;

		const piece_type =
			typeof options !== 'undefined' &&
			'piece' in options &&
			typeof options.piece === 'string'
				? options.piece.toLowerCase()
				: true;

		/* Are we generating moves for a single square? */
		if (typeof options !== 'undefined' && 'square' in options) {
			if (options.square in SQUARES) {
				first_sq = last_sq = SQUARES[options.square];
				single_square = true;
			} else {
				/* Invalid square */
				return [];
			}
		}

		for (var i = first_sq; i <= last_sq; i++) {
			/* Did we run off the end of the board */
			if (i & 0x88) {
				i += 7;
				continue;
			}

			const piece = board[i];
			if (piece == null || piece.color !== us) {
				continue;
			}

			if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
				/* Single square, non-capturing */
				var square = i + PAWN_OFFSETS[us][0];
				if (board[square] == null) {
					add_move(board, moves, i, square, BITS.NORMAL);

					/* Double square */
					var square = i + PAWN_OFFSETS[us][1];
					if (second_rank[us] === rank(i) && board[square] == null) {
						add_move(board, moves, i, square, BITS.BIG_PAWN);
					}
				}

				/* Pawn captures */
				for (j = 2; j < 4; j++) {
					var square = i + PAWN_OFFSETS[us][j];
					if (square & 0x88) continue;

					if (board[square] != null && board[square].color === them) {
						add_move(board, moves, i, square, BITS.CAPTURE);
					} else if (square === ep_square) {
						add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
					}
				}
			} else if (piece_type === true || piece_type === piece.type) {
				for (
					var j = 0, length_ = PIECE_OFFSETS[piece.type].length;
					j < length_;
					j++
				) {
					const offset = PIECE_OFFSETS[piece.type][j];
					var square = i;

					while (true) {
						square += offset;
						if (square & 0x88) break;

						if (board[square] == null) {
							add_move(board, moves, i, square, BITS.NORMAL);
						} else {
							if (board[square].color === us) break;
							add_move(board, moves, i, square, BITS.CAPTURE);
							break;
						}

						/* Break, if knight or king */
						if (piece.type === 'n' || piece.type === 'k') break;
					}
				}
			}
		}

		/* Check for castling if: a) we're generating all moves, or b) we're doing
		 * single square move generation on the king's square
		 */
		if (
			(piece_type === true || piece_type === KING) &&
			(!single_square || last_sq === kings[us])
		) {
			/* King-side castling */
			if (castling[us] & BITS.KSIDE_CASTLE) {
				var castling_from = kings[us];
				var castling_to = castling_from + 2;

				if (
					board[castling_from + 1] == null &&
					board[castling_to] == null &&
					!attacked(them, kings[us]) &&
					!attacked(them, castling_from + 1) &&
					!attacked(them, castling_to)
				) {
					add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
				}
			}

			/* Queen-side castling */
			if (castling[us] & BITS.QSIDE_CASTLE) {
				var castling_from = kings[us];
				var castling_to = castling_from - 2;

				if (
					board[castling_from - 1] == null &&
					board[castling_from - 2] == null &&
					board[castling_from - 3] == null &&
					!attacked(them, kings[us]) &&
					!attacked(them, castling_from - 1) &&
					!attacked(them, castling_to)
				) {
					add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
				}
			}
		}

		/* Return all pseudo-legal moves (this includes moves that allow the king
		 * to be captured)
		 */
		if (!legal) {
			return moves;
		}

		/* Filter out illegal moves */
		const legal_moves = [];
		for (var i = 0, length_ = moves.length; i < length_; i++) {
			make_move(moves[i]);
			if (!king_attacked(us)) {
				legal_moves.push(moves[i]);
			}

			undo_move();
		}

		return legal_moves;
	}

	/* Convert a move from 0x88 coordinates to Standard Algebraic Notation
	 * (SAN)
	 *
	 * @param {boolean} sloppy Use the sloppy SAN generator to work around over
	 * disambiguation bugs in Fritz and Chessbase.  See below:
	 *
	 * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
	 * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
	 * 4. ... Ne7 is technically the valid SAN
	 */
	function move_to_san(move, moves) {
		let output = '';

		if (move.flags & BITS.KSIDE_CASTLE) {
			output = 'O-O';
		} else if (move.flags & BITS.QSIDE_CASTLE) {
			output = 'O-O-O';
		} else {
			if (move.piece !== PAWN) {
				const disambiguator = get_disambiguator(move, moves);
				output += move.piece.toUpperCase() + disambiguator;
			}

			if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
				if (move.piece === PAWN) {
					output += algebraic(move.from)[0];
				}

				output += 'x';
			}

			output += algebraic(move.to);

			if (move.flags & BITS.PROMOTION) {
				output += '=' + move.promotion.toUpperCase();
			}
		}

		make_move(move);
		if (in_check()) {
			output += in_checkmate() ? '#' : '+';
		}

		undo_move();

		return output;
	}

	// Parses all of the decorators out of a SAN string
	function stripped_san(move) {
		return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '');
	}

	function attacked(color, square) {
		for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
			/* Did we run off the end of the board */
			if (i & 0x88) {
				i += 7;
				continue;
			}

			/* If empty square or wrong color */
			if (board[i] == null || board[i].color !== color) continue;

			const piece = board[i];
			const difference = i - square;
			const index = difference + 119;

			if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
				if (piece.type === PAWN) {
					if (difference > 0) {
						if (piece.color === WHITE) return true;
					} else if (piece.color === BLACK) return true;
					continue;
				}

				/* If the piece is a knight or a king */
				if (piece.type === 'n' || piece.type === 'k') return true;

				const offset = RAYS[index];
				let j = i + offset;

				let blocked = false;
				while (j !== square) {
					if (board[j] != null) {
						blocked = true;
						break;
					}

					j += offset;
				}

				if (!blocked) return true;
			}
		}

		return false;
	}

	function king_attacked(color) {
		return attacked(swap_color(color), kings[color]);
	}

	function in_check() {
		return king_attacked(turn);
	}

	function in_checkmate() {
		return in_check() && generate_moves().length === 0;
	}

	function in_stalemate() {
		return !in_check() && generate_moves().length === 0;
	}

	function insufficient_material() {
		const pieces = {};
		const bishops = [];
		let number_pieces = 0;
		let sq_color = 0;

		for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
			sq_color = (sq_color + 1) % 2;
			if (i & 0x88) {
				i += 7;
				continue;
			}

			const piece = board[i];
			if (piece) {
				pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
				if (piece.type === BISHOP) {
					bishops.push(sq_color);
				}

				number_pieces++;
			}
		}

		/* K vs. k */
		if (number_pieces === 2) {
			return true;
		}

		if (
			/* K vs. kn .... or .... k vs. kb */
			number_pieces === 3 &&
			(pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
		) {
			return true;
		}

		if (number_pieces === pieces[BISHOP] + 2) {
			/* Kb vs. kb where any number of bishops are all on the same color */
			let sum = 0;
			const length_ = bishops.length;
			for (var i = 0; i < length_; i++) {
				sum += bishops[i];
			}

			if (sum === 0 || sum === length_) {
				return true;
			}
		}

		return false;
	}

	function in_threefold_repetition() {
		/* TODO: while this function is fine for casual use, a better
		 * implementation would use a Zobrist key (instead of FEN). the
		 * Zobrist key would be maintained in the make_move/undo_move functions,
		 * avoiding the costly that we do below.
		 */
		const moves = [];
		const positions = {};
		let repetition = false;

		while (true) {
			const move = undo_move();
			if (!move) break;
			moves.push(move);
		}

		while (true) {
			/* Remove the last two fields in the FEN string, they're not needed
			 * when checking for draw by rep */
			const fen = generate_fen().split(' ').slice(0, 4).join(' ');

			/* Has the position occurred three or move times */
			positions[fen] = fen in positions ? positions[fen] + 1 : 1;
			if (positions[fen] >= 3) {
				repetition = true;
			}

			if (moves.length === 0) {
				break;
			}

			make_move(moves.pop());
		}

		return repetition;
	}

	function push(move) {
		history.push({
			move,
			kings: {b: kings.b, w: kings.w},
			turn,
			castling: {b: castling.b, w: castling.w},
			ep_square,
			half_moves,
			move_number,
		});
	}

	function make_move(move) {
		const us = turn;
		const them = swap_color(us);
		push(move);

		board[move.to] = board[move.from];
		board[move.from] = null;

		/* If ep capture, remove the captured pawn */
		if (move.flags & BITS.EP_CAPTURE) {
			if (turn === BLACK) {
				board[move.to - 16] = null;
			} else {
				board[move.to + 16] = null;
			}
		}

		/* If pawn promotion, replace with new piece */
		if (move.flags & BITS.PROMOTION) {
			board[move.to] = {type: move.promotion, color: us};
		}

		/* If we moved the king */
		if (board[move.to].type === KING) {
			kings[board[move.to].color] = move.to;

			/* If we castled, move the rook next to the king */
			if (move.flags & BITS.KSIDE_CASTLE) {
				var castling_to = move.to - 1;
				var castling_from = move.to + 1;
				board[castling_to] = board[castling_from];
				board[castling_from] = null;
			} else if (move.flags & BITS.QSIDE_CASTLE) {
				var castling_to = move.to + 1;
				var castling_from = move.to - 2;
				board[castling_to] = board[castling_from];
				board[castling_from] = null;
			}

			/* Turn off castling */
			castling[us] = '';
		}

		/* Turn off castling if we move a rook */
		if (castling[us]) {
			for (var i = 0, length_ = ROOKS[us].length; i < length_; i++) {
				if (
					move.from === ROOKS[us][i].square &&
					castling[us] & ROOKS[us][i].flag
				) {
					castling[us] ^= ROOKS[us][i].flag;
					break;
				}
			}
		}

		/* Turn off castling if we capture a rook */
		if (castling[them]) {
			for (var i = 0, length_ = ROOKS[them].length; i < length_; i++) {
				if (
					move.to === ROOKS[them][i].square &&
					castling[them] & ROOKS[them][i].flag
				) {
					castling[them] ^= ROOKS[them][i].flag;
					break;
				}
			}
		}

		/* If big pawn move, update the en passant square */
		if (move.flags & BITS.BIG_PAWN) {
			ep_square = turn === 'b' ? move.to - 16 : move.to + 16;
		} else {
			ep_square = EMPTY;
		}

		/* Reset the 50 move counter if a pawn is moved or a piece is captured */
		if (move.piece === PAWN) {
			half_moves = 0;
		} else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
			half_moves = 0;
		} else {
			half_moves++;
		}

		if (turn === BLACK) {
			move_number++;
		}

		turn = swap_color(turn);
	}

	function undo_move() {
		const old = history.pop();
		if (old == null) {
			return null;
		}

		const move = old.move;
		kings = old.kings;
		turn = old.turn;
		castling = old.castling;
		ep_square = old.ep_square;
		half_moves = old.half_moves;
		move_number = old.move_number;

		const us = turn;
		const them = swap_color(turn);

		board[move.from] = board[move.to];
		board[move.from].type = move.piece; // To undo any promotions
		board[move.to] = null;

		if (move.flags & BITS.CAPTURE) {
			board[move.to] = {type: move.captured, color: them};
		} else if (move.flags & BITS.EP_CAPTURE) {
			let index;
			index = us === BLACK ? move.to - 16 : move.to + 16;
			board[index] = {type: PAWN, color: them};
		}

		if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
			let castling_to;
			let castling_from;
			if (move.flags & BITS.KSIDE_CASTLE) {
				castling_to = move.to + 1;
				castling_from = move.to - 1;
			} else if (move.flags & BITS.QSIDE_CASTLE) {
				castling_to = move.to - 2;
				castling_from = move.to + 1;
			}

			board[castling_to] = board[castling_from];
			board[castling_from] = null;
		}

		return move;
	}

	/* This function is used to uniquely identify ambiguous moves */
	function get_disambiguator(move, moves) {
		const from = move.from;
		const to = move.to;
		const piece = move.piece;

		let ambiguities = 0;
		let same_rank = 0;
		let same_file = 0;

		for (let i = 0, length_ = moves.length; i < length_; i++) {
			const ambig_from = moves[i].from;
			const ambig_to = moves[i].to;
			const ambig_piece = moves[i].piece;

			/* If a move of the same piece type ends on the same to square, we'll
			 * need to add a disambiguator to the algebraic notation
			 */
			if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
				ambiguities++;

				if (rank(from) === rank(ambig_from)) {
					same_rank++;
				}

				if (file(from) === file(ambig_from)) {
					same_file++;
				}
			}
		}

		if (ambiguities > 0) {
			/* If there exists a similar moving piece on the same rank and file as
			 * the move in question, use the square as the disambiguator
			 */
			if (same_rank > 0 && same_file > 0) {
				return algebraic(from);
			}

			if (same_file > 0) {
				/* If the moving piece rests on the same file, use the rank symbol as the
				 * disambiguator
				 */
				return algebraic(from).charAt(1);
			}

			/* Else use the file symbol */
			return algebraic(from).charAt(0);
		}

		return '';
	}

	function infer_piece_type(san) {
		let piece_type = san.charAt(0);
		if (piece_type >= 'a' && piece_type <= 'h') {
			const matches = san.match(/[a-h]\d.*[a-h]\d/);
			if (matches) {
				return undefined;
			}

			return PAWN;
		}

		piece_type = piece_type.toLowerCase();
		if (piece_type === 'o') {
			return KING;
		}

		return piece_type;
	}

	function ascii() {
		let s = '   +------------------------+\n';
		for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
			/* Display the rank */
			if (file(i) === 0) {
				s += ' ' + '87654321'[rank(i)] + ' |';
			}

			/* Empty piece */
			if (board[i] == null) {
				s += ' . ';
			} else {
				const piece = board[i].type;
				const color = board[i].color;
				const symbol =
					color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
				s += ' ' + symbol + ' ';
			}

			if ((i + 1) & 0x88) {
				s += '|\n';
				i += 8;
			}
		}

		s += '   +------------------------+\n';
		s += '     a  b  c  d  e  f  g  h\n';

		return s;
	}

	// Convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
	function move_from_san(move, sloppy) {
		// Strip off any move decorations: e.g Nf3+?! becomes Nf3
		const clean_move = stripped_san(move);

		var overly_disambiguated = false;

		if (sloppy) {
			// The sloppy parser allows the user to parse non-standard chess
			// notations. This parser is opt-in (by specifying the
			// '{ sloppy: true }' setting) and is only run after the Standard
			// Algebraic Notation (SAN) parser has failed.
			//
			// When running the sloppy parser, we'll run a regex to grab the piece,
			// the to/from square, and an optional promotion piece. This regex will
			// parse common non-standard notation like: Pe2-e4, Rc1c4, Qf3xf7, f7f8q,
			// b1c3

			// NOTE: Some positions and moves may be ambiguous when using the sloppy
			// parser. For example, in this position: 6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1,
			// the move b1c3 may be interpreted as Nc3 or B1c3 (a disambiguated
			// bishop move). In these cases, the sloppy parser will default to the
			// most most basic interpretation - b1c3 parses to Nc3.

			var matches = clean_move.match(
				/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/,
			);
			if (matches) {
				var piece = matches[1];
				var from = matches[2];
				var to = matches[3];
				var promotion = matches[4];

				if (from.length == 1) {
					overly_disambiguated = true;
				}
			} else {
				// The [a-h]?[1-8]? portion of the regex below handles moves that may
				// be overly disambiguated (e.g. Nge7 is unnecessary and non-standard
				// when there is one legal knight move to e7). In this case, the value
				// of 'from' variable will be a rank or file, not a square.
				var matches = clean_move.match(
					/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/,
				);

				if (matches) {
					var piece = matches[1];
					var from = matches[2];
					var to = matches[3];
					var promotion = matches[4];

					if (from.length == 1) {
						var overly_disambiguated = true;
					}
				}
			}
		}

		const piece_type = infer_piece_type(clean_move);
		const moves = generate_moves({
			legal: true,
			piece: piece ? piece : piece_type,
		});

		for (let i = 0, length_ = moves.length; i < length_; i++) {
			// Try the strict parser first, then the sloppy parser if requested
			// by the user
			if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
				return moves[i];
			}

			if (sloppy && matches) {
				// Hand-compare move properties with the results from our sloppy
				// regex
				if (
					(!piece || piece.toLowerCase() == moves[i].piece) &&
					SQUARES[from] == moves[i].from &&
					SQUARES[to] == moves[i].to &&
					(!promotion || promotion.toLowerCase() == moves[i].promotion)
				) {
					return moves[i];
				}

				if (overly_disambiguated) {
					// SPECIAL CASE: we parsed a move string that may have an unneeded
					// rank/file disambiguator (e.g. Nge7).  The 'from' variable will
					const square = algebraic(moves[i].from);
					if (
						(!piece || piece.toLowerCase() == moves[i].piece) &&
						SQUARES[to] == moves[i].to &&
						(from == square[0] || from == square[1]) &&
						(!promotion || promotion.toLowerCase() == moves[i].promotion)
					) {
						return moves[i];
					}
				}
			}
		}

		return null;
	}

	/*****************************************************************************
	 * UTILITY FUNCTIONS
	 ****************************************************************************/
	function rank(i) {
		return i >> 4;
	}

	function file(i) {
		return i & 15;
	}

	function algebraic(i) {
		const f = file(i);
		const r = rank(i);
		return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
	}

	function swap_color(c) {
		return c === WHITE ? BLACK : WHITE;
	}

	function is_digit(c) {
		return '0123456789'.includes(c);
	}

	/* Pretty = external move object */
	function make_pretty(ugly_move) {
		const move = clone(ugly_move);
		move.san = move_to_san(move, generate_moves({legal: true}));
		move.to = algebraic(move.to);
		move.from = algebraic(move.from);

		let flags = '';

		for (const flag in BITS) {
			if (BITS[flag] & move.flags) {
				flags += FLAGS[flag];
			}
		}

		move.flags = flags;

		return move;
	}

	function clone(object) {
		const dupe = Array.isArray(object) ? [] : {};

		for (const property in object) {
			if (typeof property === 'object') {
				dupe[property] = clone(object[property]);
			} else {
				dupe[property] = object[property];
			}
		}

		return dupe;
	}

	function trim(string_) {
		return string_.replace(/^\s+|\s+$/g, '');
	}

	/*****************************************************************************
	 * DEBUGGING UTILITIES
	 ****************************************************************************/
	function perft(depth) {
		const moves = generate_moves({legal: false});
		let nodes = 0;
		const color = turn;

		for (let i = 0, length_ = moves.length; i < length_; i++) {
			make_move(moves[i]);
			if (!king_attacked(color)) {
				if (depth - 1 > 0) {
					const child_nodes = perft(depth - 1);
					nodes += child_nodes;
				} else {
					nodes++;
				}
			}

			undo_move();
		}

		return nodes;
	}

	return {
		/***************************************************************************
		 * PUBLIC CONSTANTS (is there a better way to do this?)
		 **************************************************************************/
		WHITE,
		BLACK,
		PAWN,
		KNIGHT,
		BISHOP,
		ROOK,
		QUEEN,
		KING,
		SQUARES: (function () {
			/* From the ECMA-262 spec (section 12.6.4):
			 * "The mechanics of enumerating the properties ... is
			 * implementation dependent"
			 * so: for (var sq in SQUARES) { keys.push(sq); } might not be
			 * ordered correctly
			 */
			const keys = [];
			for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
				if (i & 0x88) {
					i += 7;
					continue;
				}

				keys.push(algebraic(i));
			}

			return keys;
		})(),
		FLAGS,

		/***************************************************************************
		 * PUBLIC API
		 **************************************************************************/
		load(fen) {
			return load(fen);
		},

		reset() {
			return reset();
		},

		moves(options) {
			/* The internal representation of a chess move is in 0x88 format, and
			 * not meant to be human-readable.  The code below converts the 0x88
			 * square coordinates to algebraic coordinates.  It also prunes an
			 * unnecessary move keys resulting from a verbose call.
			 */

			const ugly_moves = generate_moves(options);
			const moves = [];

			for (let i = 0, length_ = ugly_moves.length; i < length_; i++) {
				/* Does the user want a full move object (most likely not), or just
				 * SAN
				 */
				if (
					typeof options !== 'undefined' &&
					'verbose' in options &&
					options.verbose
				) {
					moves.push(make_pretty(ugly_moves[i]));
				} else {
					moves.push(move_to_san(ugly_moves[i], generate_moves({legal: true})));
				}
			}

			return moves;
		},

		in_check() {
			return in_check();
		},

		in_checkmate() {
			return in_checkmate();
		},

		in_stalemate() {
			return in_stalemate();
		},

		in_draw() {
			return (
				half_moves >= 100 ||
				in_stalemate() ||
				insufficient_material() ||
				in_threefold_repetition()
			);
		},

		insufficient_material() {
			return insufficient_material();
		},

		in_threefold_repetition() {
			return in_threefold_repetition();
		},

		game_over() {
			return (
				half_moves >= 100 ||
				in_checkmate() ||
				in_stalemate() ||
				insufficient_material() ||
				in_threefold_repetition()
			);
		},

		validate_fen(fen) {
			return validate_fen(fen);
		},

		fen() {
			return generate_fen();
		},

		board() {
			const output = [];
			let row = [];

			for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
				if (board[i] == null) {
					row.push(null);
				} else {
					row.push({type: board[i].type, color: board[i].color});
				}

				if ((i + 1) & 0x88) {
					output.push(row);
					row = [];
					i += 8;
				}
			}

			return output;
		},

		pgn(options) {
			/* Using the specification from http://www.chessclub.com/help/PGN-spec
			 * example for html usage: .pgn({ max_width: 72, newline_char: "<br />" })
			 */
			const newline =
				typeof options === 'object' && typeof options.newline_char === 'string'
					? options.newline_char
					: '\n';
			const max_width =
				typeof options === 'object' && typeof options.max_width === 'number'
					? options.max_width
					: 0;
			const result = [];
			let header_exists = false;

			/* Add the PGN header headerrmation */
			for (var i in header) {
				/* TODO: order of enumerated properties in header object is not
				 * guaranteed, see ECMA-262 spec (section 12.6.4)
				 */
				result.push('[' + i + ' "' + header[i] + '"]' + newline);
				header_exists = true;
			}

			if (header_exists && history.length > 0) {
				result.push(newline);
			}

			const append_comment = function (move_string) {
				const comment = comments[generate_fen()];
				if (typeof comment !== 'undefined') {
					const delimiter = move_string.length > 0 ? ' ' : '';
					move_string = `${move_string}${delimiter}{${comment}}`;
				}

				return move_string;
			};

			/* Pop all of history onto reversed_history */
			const reversed_history = [];
			while (history.length > 0) {
				reversed_history.push(undo_move());
			}

			const moves = [];
			let move_string = '';

			/* Special case of a commented starting position with no moves */
			if (reversed_history.length === 0) {
				moves.push(append_comment(''));
			}

			/* Build the list of moves.  a move_string looks like: "3. e3 e6" */
			while (reversed_history.length > 0) {
				move_string = append_comment(move_string);
				const move = reversed_history.pop();

				/* If the position started with black to move, start PGN with 1. ... */
				if (history.length === 0 && move.color === 'b') {
					move_string = move_number + '. ...';
				} else if (move.color === 'w') {
					/* Store the previous generated move_string if we have one */
					if (move_string.length > 0) {
						moves.push(move_string);
					}

					move_string = move_number + '.';
				}

				move_string =
					move_string + ' ' + move_to_san(move, generate_moves({legal: true}));
				make_move(move);
			}

			/* Are there any other leftover moves? */
			if (move_string.length > 0) {
				moves.push(append_comment(move_string));
			}

			/* Is there a result? */
			if (typeof header.Result !== 'undefined') {
				moves.push(header.Result);
			}

			/* History should be back to what it was before we started generating PGN,
			 * so join together moves
			 */
			if (max_width === 0) {
				return result.join('') + moves.join(' ');
			}

			const strip = function () {
				if (result.length > 0 && result[result.length - 1] === ' ') {
					result.pop();
					return true;
				}

				return false;
			};

			/* NB: this does not preserve comment whitespace. */
			const wrap_comment = function (width, move) {
				for (const token of move.split(' ')) {
					if (!token) {
						continue;
					}

					if (width + token.length > max_width) {
						while (strip()) {
							width--;
						}

						result.push(newline);
						width = 0;
					}

					result.push(token);
					width += token.length;
					result.push(' ');
					width++;
				}

				if (strip()) {
					width--;
				}

				return width;
			};

			/* Wrap the PGN output at max_width */
			let current_width = 0;
			for (var i = 0; i < moves.length; i++) {
				if (
					current_width + moves[i].length > max_width &&
					moves[i].includes('{')
				) {
					current_width = wrap_comment(current_width, moves[i]);
					continue;
				}

				/* If the current move will push past max_width */
				if (current_width + moves[i].length > max_width && i !== 0) {
					/* Don't end the line with whitespace */
					if (result[result.length - 1] === ' ') {
						result.pop();
					}

					result.push(newline);
					current_width = 0;
				} else if (i !== 0) {
					result.push(' ');
					current_width++;
				}

				result.push(moves[i]);
				current_width += moves[i].length;
			}

			return result.join('');
		},

		load_pgn(pgn, options) {
			// Allow the user to specify the sloppy move parser to work around over
			// disambiguation bugs in Fritz and Chessbase
			const sloppy =
				typeof options !== 'undefined' && 'sloppy' in options
					? options.sloppy
					: false;

			function mask(string_) {
				return string_.replace(/\\/g, '\\');
			}

			function has_keys(object) {
				for (const key in object) {
					return true;
				}

				return false;
			}

			function parse_pgn_header(header, options) {
				const newline_char =
					typeof options === 'object' &&
					typeof options.newline_char === 'string'
						? options.newline_char
						: '\r?\n';
				const header_object = {};
				const headers = header.split(new RegExp(mask(newline_char)));
				let key = '';
				let value = '';

				for (const header_ of headers) {
					key = header_.replace(/^\[([A-Z][A-Za-z]*)\s.*]$/, '$1');
					value = header_.replace(/^\[[A-Za-z]+\s"(.*)" *]$/, '$1');
					if (trim(key).length > 0) {
						header_object[key] = value;
					}
				}

				return header_object;
			}

			const newline_char =
				typeof options === 'object' && typeof options.newline_char === 'string'
					? options.newline_char
					: '\r?\n';

			// RegExp to split header. Takes advantage of the fact that header and movetext
			// will always have a blank line between them (ie, two newline_char's).
			// With default newline_char, will equal: /^(\[((?:\r?\n)|.)*\])(?:\r?\n){2}/
			const header_regex = new RegExp(
				'^(\\[((?:' +
					mask(newline_char) +
					')|.)*\\])' +
					'(?:' +
					mask(newline_char) +
					'){2}',
			);

			// If no header given, begin with moves.
			const header_string = header_regex.test(pgn)
				? header_regex.exec(pgn)[1]
				: '';

			// Put the board in the starting position
			reset();

			/* Parse PGN header */
			const headers = parse_pgn_header(header_string, options);
			for (const key in headers) {
				set_header([key, headers[key]]);
			}

			/* Load the starting position indicated by [Setup '1'] and
			 * [FEN position] */
			if (
				headers.SetUp === '1' &&
				!('FEN' in headers && load(headers.FEN, true))
			) {
				// Second argument to load: don't clear the headers
				return false;
			}

			/* NB: the regexes below that delete move numbers, recursive
			 * annotations, and numeric annotation glyphs may also match
			 * text in comments. To prevent this, we transform comments
			 * by hex-encoding them in place and decoding them again after
			 * the other tokens have been deleted.
			 *
			 * While the spec states that PGN files should be ASCII encoded,
			 * we use {en,de}codeURIComponent here to support arbitrary UTF8
			 * as a convenience for modern users */

			const to_hex = function (string) {
				return Array.from(string)
					.map(function (c) {
						/* EncodeURI doesn't transform most ASCII characters,
						 * so we handle these ourselves */
						return c.charCodeAt(0) < 128
							? c.charCodeAt(0).toString(16)
							: encodeURIComponent(c).replace(/%/g, '').toLowerCase();
					})
					.join('');
			};

			const from_hex = function (string) {
				return string.length === 0
					? ''
					: decodeURIComponent('%' + string.match(/.{1,2}/g).join('%'));
			};

			const encode_comment = function (string) {
				string = string.replace(new RegExp(mask(newline_char), 'g'), ' ');
				return `{${to_hex(string.slice(1, -1))}}`;
			};

			const decode_comment = function (string) {
				if (string.startsWith('{') && string.endsWith('}')) {
					return from_hex(string.slice(1, -1));
				}
			};

			/* Delete header to get the moves */
			let ms = pgn
				.replace(header_string, '')
				.replace(
					/* Encode comments so they don't get deleted below */
					new RegExp(`(\{[^}]*\})+?|;([^${mask(newline_char)}]*)`, 'g'),
					function (match, bracket, semicolon) {
						return bracket !== undefined
							? encode_comment(bracket)
							: ' ' + encode_comment(`{${semicolon.slice(1)}}`);
					},
				)
				.replace(new RegExp(mask(newline_char), 'g'), ' ');

			/* Delete recursive annotation variations */
			const rav_regex = /(\([^()]+\))+?/g;
			while (rav_regex.test(ms)) {
				ms = ms.replace(rav_regex, '');
			}

			/* Delete move numbers */
			ms = ms.replace(/\d+\.(\.\.)?/g, '');

			/* Delete ... indicating black to move */
			ms = ms.replace(/\.{3}/g, '');

			/* Delete numeric annotation glyphs */
			ms = ms.replace(/\$\d+/g, '');

			/* Trim and get array of moves */
			let moves = trim(ms).split(new RegExp(/\s+/));

			/* Delete empty entries */
			moves = moves.join(',').replace(/,,+/g, ',').split(',');
			let move = '';

			let result = '';

			for (const move_ of moves) {
				const comment = decode_comment(move_);
				if (comment !== undefined) {
					comments[generate_fen()] = comment;
					continue;
				}

				move = move_from_san(move_, sloppy);

				/* Invalid move */
				if (move == null) {
					/* Was the move an end of game marker */
					if (TERMINATION_MARKERS.has(move_)) {
						result = move_;
					} else {
						return false;
					}
				} else {
					/* Reset the end of game marker if making a valid move */
					result = '';
					make_move(move);
				}
			}

			/* Per section 8.2.6 of the PGN spec, the Result tag pair must match
			 * match the termination marker. Only do this when headers are present,
			 * but the result tag is missing
			 */
			if (result && Object.keys(header).length > 0 && !header.Result) {
				set_header(['Result', result]);
			}

			return true;
		},

		header() {
			return set_header(arguments);
		},

		ascii() {
			return ascii();
		},

		turn() {
			return turn;
		},

		move(move, options) {
			/* The move function can be called with in the following parameters:
			 *
			 * .move('Nxb7')      <- where 'move' is a case-sensitive SAN string
			 *
			 * .move({ from: 'h7', <- where the 'move' is a move object (additional
			 *         to :'h8',      fields are ignored)
			 *         promotion: 'q',
			 *      })
			 */

			// allow the user to specify the sloppy move parser to work around over
			// disambiguation bugs in Fritz and Chessbase
			const sloppy =
				typeof options !== 'undefined' && 'sloppy' in options
					? options.sloppy
					: false;

			let move_object = null;

			if (typeof move === 'string') {
				move_object = move_from_san(move, sloppy);
			} else if (typeof move === 'object') {
				const moves = generate_moves();

				/* Convert the pretty move object to an ugly move object */
				for (let i = 0, length_ = moves.length; i < length_; i++) {
					if (
						move.from === algebraic(moves[i].from) &&
						move.to === algebraic(moves[i].to) &&
						(!('promotion' in moves[i]) ||
							move.promotion === moves[i].promotion)
					) {
						move_object = moves[i];
						break;
					}
				}
			}

			/* Failed to find move */
			if (!move_object) {
				return null;
			}

			/* Need to make a copy of move because we can't generate SAN after the
			 * move is made
			 */
			const pretty_move = make_pretty(move_object);

			make_move(move_object);

			return pretty_move;
		},

		undo() {
			const move = undo_move();
			return move ? make_pretty(move) : null;
		},

		clear() {
			return clear();
		},

		put(piece, square) {
			return put(piece, square);
		},

		get(square) {
			return get(square);
		},

		remove(square) {
			return remove(square);
		},

		perft(depth) {
			return perft(depth);
		},

		square_color(square) {
			if (square in SQUARES) {
				const sq_0x88 = SQUARES[square];
				return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark';
			}

			return null;
		},

		history(options) {
			const reversed_history = [];
			const move_history = [];
			const verbose =
				typeof options !== 'undefined' &&
				'verbose' in options &&
				options.verbose;

			while (history.length > 0) {
				reversed_history.push(undo_move());
			}

			while (reversed_history.length > 0) {
				const move = reversed_history.pop();
				if (verbose) {
					move_history.push(make_pretty(move));
				} else {
					move_history.push(move_to_san(move, generate_moves({legal: true})));
				}

				make_move(move);
			}

			return move_history;
		},

		get_comment() {
			return comments[generate_fen()];
		},

		set_comment(comment) {
			comments[generate_fen()] = comment.replace('{', '[').replace('}', ']');
		},

		delete_comment() {
			const comment = comments[generate_fen()];
			delete comments[generate_fen()];
			return comment;
		},

		get_comments() {
			prune_comments();
			return Object.keys(comments).map(function (fen) {
				return {fen, comment: comments[fen]};
			});
		},

		delete_comments() {
			prune_comments();
			return Object.keys(comments).map(function (fen) {
				const comment = comments[fen];
				delete comments[fen];
				return {fen, comment};
			});
		},
	};
};

/* Export Chess object if using node or any other CommonJS compatible
 * environment */
if (typeof exports !== 'undefined') exports.Chess = Chess;
/* Export Chess object for any RequireJS compatible environment */
if (typeof define !== 'undefined')
	define(function () {
		return Chess;
	});
