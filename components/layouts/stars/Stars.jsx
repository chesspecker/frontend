import Image from 'next/image.js';
import starYellow from '../../../public/images/star-yellow.svg';
import starGrey from '../../../public/images/star-grey.svg';
import style from './Stars.module.scss';

function Stars({numberStar}) {
	return (
		<div className={style.stars_container}>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={numberStar > 0 ? starYellow : starGrey} />
			</div>
			<div className={`${style.star} ${style.star_primary} ${style.star_big}`}>
				<Image src={numberStar >= 2 ? starYellow : starGrey} />
			</div>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={numberStar === 3 ? starYellow : starGrey} />
			</div>
		</div>
	);
}

export default Stars;
