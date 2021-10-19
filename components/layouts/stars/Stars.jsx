import React from 'react';
import style from './Stars.module.scss';
import star from '../../../public/images/star.svg';
import Image from 'next/image.js';

function Stars(props) {
	return (
		<div className={style.stars_container}>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={star}></Image>
			</div>
			<div className={`${style.star} ${style.star_primary} ${style.star_big}`}>
				<Image src={star}></Image>
			</div>
			<div
				className={`${style.star} ${style.star_primary} ${style.star_normal}`}
			>
				<Image src={star}></Image>
			</div>
		</div>
	);
}

export default Stars;
