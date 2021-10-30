import Image from 'next/image.js';
import queenW from '../../public/images/pieces/merida/wQ.svg';
import rookW from '../../public/images/pieces/merida/wR.svg';
import bishopW from '../../public/images/pieces/merida/wB.svg';
import knightW from '../../public/images/pieces/merida/wN.svg';
import queenB from '../../public/images/pieces/merida/bQ.svg';
import rookB from '../../public/images/pieces/merida/bR.svg';
import bishopB from '../../public/images/pieces/merida/bB.svg';
import knightB from '../../public/images/pieces/merida/bN.svg';
import style from './PromotionContainer.module.scss';

export default function ({chess, promotion, selectVisible}) {
	if (!chess) return null;
	return (
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
	);
}
