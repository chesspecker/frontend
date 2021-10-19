import React from 'react';
import style from './SetCategory.module.scss';

function SetCategory(props) {
	return (
		<div className={style.set_category}>
			<h3 className={style.set_category_title}>Opening</h3>
			<div className={style.set_category_choices}>
				<Choice
					selected={choicesSelected}
					id='234'
					title='Title du turf'
					description='bonsoir paris'
					onClick={handleClick}
				/>
			</div>
		</div>
	);
}

export default SetCategory;
