import Image from 'next/image.js';
import STYLE from './promotion-container.module.scss';
import queenW from '@/public/pieces/wQ.svg';
import rookW from '@/public/pieces/wR.svg';
import bishopW from '@/public/pieces/wB.svg';
import knightW from '@/public/pieces/wN.svg';
import queenB from '@/public/pieces/bQ.svg';
import rookB from '@/public/pieces/bR.svg';
import bishopB from '@/public/pieces/bB.svg';
import knightB from '@/public/pieces/bN.svg';

function PromotionContainer({chess, promotion, selectVisible}) {
	if (!chess) return null;
	return (
		<div
			style={selectVisible ? {display: 'flex'} : {display: 'none'}}
			className={STYLE.promotion_container}
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
	);
}

export default PromotionContainer;
