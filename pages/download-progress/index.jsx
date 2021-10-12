import React from 'react';

import PageHeader from '../../components/layouts/PageHeader.jsx';

import style from './index.module.scss';

function DownloadProgress(props) {
	return (
		<PageHeader>
			<div className={style.container} />
		</PageHeader>
	);
}

export default DownloadProgress;
