import Image from 'next/image.js';
import star from '../../../public/images/star.svg';
import style from './Stars.module.scss';

function Stars() {
	return (
		<div className={style.stars_container}>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={star} />
			</div>
			<div className={`${style.star} ${style.star_primary} ${style.star_big}`}>
				<Image src={star} />
			</div>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={star} />
			</div>
		</div>
	);
}

export default Stars;
