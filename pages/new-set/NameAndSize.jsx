import React from 'react';
import Link from 'next/link.js';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import OptionNumber from '../../components/layouts/form/OptionNumber.jsx';
import OptionTextInput from '../../components/layouts/form/OptionTextInput.jsx';
import Btn from '../../components/layouts/btn/Btn.jsx';
import style from './NameAndSize.module.scss';

function NameAndSize(props) {
	return (
		<PageHeader>
			<div className={style.container}>
				<h2 className={style.title}>On last thing</h2>
				<div className={style.content}>
					<OptionTextInput>Give your set a Name</OptionTextInput>
					<OptionNumber>How many game for your set ?</OptionNumber>
					<div className={style.btn_container}>
						<Link href='/dashboard'>
							<Btn>Let's go ! 🎉</Btn>
						</Link>
					</div>
				</div>
			</div>
		</PageHeader>
	);
}

export default NameAndSize;
