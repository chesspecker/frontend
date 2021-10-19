import React from 'react';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import style from './index.module.scss';

function NewSet(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>
					{' '}
					Select one or more category to create your set !
				</h2>
			</div>
		</PageHeader>
	);
}

export default NewSet;
